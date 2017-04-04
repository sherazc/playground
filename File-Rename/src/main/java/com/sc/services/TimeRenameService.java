package com.sc.services;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifIFD0Directory;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import com.sc.commons.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.BasicFileAttributeView;
import java.nio.file.attribute.FileTime;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TimeRenameService implements FileHandlerService {

    private static final Logger LOG = LoggerFactory.getLogger(TimeRenameService.class);
    public static final String CONFIG_TIMESTAMP_PATTERN_KEY = "CONFIG_TIMESTAMP_PATTERN_KEY";

    public static final String[] PATTERN_TYPE_NAMES = {"Year Month Date Hour Minutes Seconds", "Month Date Hour Minutes Seconds"};

    public static final Map<String, String> PATTERN_TYPES = new HashMap<>();

    static {
        PATTERN_TYPES.put(PATTERN_TYPE_NAMES[0], "yyMMddHHmmss_");
        PATTERN_TYPES.put(PATTERN_TYPE_NAMES[1], "MMddHHmmss_");
    }

    private StatusUpdater statusUpdater;

    private boolean runningFlag;

    @Override
    public void handle(String source, String destination, Map<String, String> configs, StatusUpdater statusUpdater) {
        statusUpdater.resetProgress();
        runningFlag = true;
        this.statusUpdater = statusUpdater;
        if (StringUtils.isBlank(source) || StringUtils.isBlank(destination)) {
            logError("Source or destination not defined. Source=" + source + " destination=" + destination);
            return;
        }

        if (configs == null || StringUtils.isBlank(configs.get(TimeRenameService.CONFIG_TIMESTAMP_PATTERN_KEY))) {
            logError(TimeRenameService.CONFIG_TIMESTAMP_PATTERN_KEY + " not configured.");
            return;
        }

        File sourceDir = new File(source);
        File destinationDir = new File(destination);

        if (!sourceDir.exists() || !destinationDir.exists()) {
            logError("Source or destination directories do not exists. Source=" + sourceDir.getAbsolutePath()
                    + " destination=" + destinationDir.getAbsolutePath());
            return;
        }

        if (!sourceDir.isDirectory() || !destinationDir.isDirectory()) {
            logError("Source or destination directories are not Directory. Source=" + sourceDir.getAbsolutePath() + " destination=" + destinationDir.getAbsolutePath());
            return;
        }

        String datePattern = configs.get(TimeRenameService.CONFIG_TIMESTAMP_PATTERN_KEY).trim();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(datePattern);

        List<File> sourceFiles = FileUtils.allDirectoryFiles(sourceDir.getAbsolutePath());


        if (sourceFiles != null && sourceFiles.size() > 0) {
            int allFilesCount = sourceFiles.size();
            int fileCycleCount = 0;

            for (File sourceFile : sourceFiles) {
                if (!runningFlag) {
                    break;
                }
                statusUpdater.updateCycleProgress(allFilesCount, ++fileCycleCount);
                String destinationFileName = createDestinationFileName(destinationDir, sourceFile, simpleDateFormat);
                logDebug("Copying " + sourceFile.getAbsolutePath());

                if (StringUtils.isBlank(destinationFileName)) {
                    logWarning("Skipping. Can not create destination File Name");
                    continue;
                }
                File destinationFile = new File(destinationFileName);

                if (destinationFile.exists()) {
                    logWarning("Skipping. Destination File already exists. " + destinationFile.getAbsolutePath());
                    continue;
                }

                logDebug("To " + destinationFile.getAbsolutePath());
                try {
                    Files.copy(sourceFile.toPath(), destinationFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException e) {
                    LOG.error("Error copying " + sourceFile.getAbsolutePath() + " to " + destinationFile.getAbsolutePath(), e);
                }

            }
        } else {
            statusUpdater.updateCycleLog("Source directory is empty.");
        }
        if (runningFlag) {
            statusUpdater.completeProcess();
            runningFlag = false;
        } else {
            statusUpdater.processCanceled();
        }

        LOG.debug("Done!");
    }

    @Override
    public void cancelProcess() {
        this.runningFlag = false;
    }

    private String createDestinationFileName(File destinationDir, File sourceFile, SimpleDateFormat simpleDateFormat) {

        Date creationDate = imageTakenOrModifiedDate(sourceFile);
        if (creationDate == null) {
            LOG.error("Error getting source file\' date time. Source File=" + sourceFile.getAbsolutePath());
            return null;
        }

        String formattedCreationDate = simpleDateFormat.format(creationDate);
        return destinationDir.getAbsolutePath() + "/" + formattedCreationDate + sourceFile.getName();
    }

    private Date imageTakenOrModifiedDate(File sourceFile) {
        Date creationDate = extractDateTakenFromMetadata(sourceFile);
        if (creationDate == null) {
            creationDate = extractFileModifiedDate(sourceFile);
        }
        return creationDate;
    }

    private Date extractFileModifiedDate(File sourceFile) {
        Date result = null;
        try {
            BasicFileAttributeView sourceFileAttributeView = Files.getFileAttributeView(sourceFile.toPath(),
                    BasicFileAttributeView.class);
            FileTime fileTime = sourceFileAttributeView.readAttributes().lastModifiedTime();
            long creationMillis = fileTime.toMillis();
            if (creationMillis > 0) {
                result = new Date(creationMillis);
            }

            fileTime = sourceFileAttributeView.readAttributes().creationTime();
            creationMillis = fileTime.toMillis();
            if (creationMillis > 0) {
                result = new Date(creationMillis);
            }

        } catch (Exception e) {
            String message = "Error getting source file creating time. Source File=" + sourceFile.getAbsolutePath() + " " + e.getMessage();
            LOG.error(message, e);
            return null;
        }
        return result;
    }

    private Date extractDateTakenFromMetadata(File sourceFile) {
        Date result = null;
        Metadata metadata = null;
        try {
            metadata = ImageMetadataReader.readMetadata(sourceFile);
        } catch (Exception e) {
            String message = "Can't get file metadata. Not an Image file. " + sourceFile.getAbsolutePath() + " " + e.getMessage();
            // This would confuse user.
            // statusUpdater.updateCycleLog(message);
            LOG.info(message);
        }

        // Date digitizeDate = null;
        if (metadata != null) {
            Collection<ExifSubIFDDirectory> exifSubIFDDirectories = metadata.getDirectoriesOfType(ExifSubIFDDirectory.class);
            ExifSubIFDDirectory exifSubIFDDirectory = null;
            if (exifSubIFDDirectories != null) {
                for (ExifSubIFDDirectory exifSubIFD0Dir : exifSubIFDDirectories) {
                    exifSubIFDDirectory = exifSubIFD0Dir;
                    break;
                }
            }

            if (exifSubIFDDirectory != null) {
                result = exifSubIFDDirectory.getDate(ExifIFD0Directory.TAG_DATETIME_ORIGINAL);
                // digitizeDate = exifSubIFDDirectory.getDate(ExifIFD0Directory.TAG_DATETIME_DIGITIZED);
            }
        }

        if (result == null && metadata != null) {
            Collection<ExifIFD0Directory> exifIFD0Directories = metadata.getDirectoriesOfType(ExifIFD0Directory.class);
            ExifIFD0Directory exifIFD0Directory = null;
            if (exifIFD0Directories != null) {
                for (ExifIFD0Directory exifIFD0Dir : exifIFD0Directories) {
                    exifIFD0Directory = exifIFD0Dir;
                    break;
                }
            }

            if (exifIFD0Directory != null) {
                result = exifIFD0Directory.getDate(ExifIFD0Directory.TAG_DATETIME);
            }
        }
        return result;
    }

    private void logError(String logMessage) {
        LOG.error("ERROR: " + logMessage);
        statusUpdater.updateCycleLog(logMessage);
    }

    private void logWarning(String logMessage) {
        LOG.warn("WARNING: " + logMessage);
        statusUpdater.updateCycleLog(logMessage);
    }

    private void logDebug(String logMessage) {
        LOG.debug(logMessage);
        statusUpdater.updateCycleLog(logMessage);
    }
}

