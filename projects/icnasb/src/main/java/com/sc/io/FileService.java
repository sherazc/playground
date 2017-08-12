package com.sc.io;

import com.sc.domain.FileResource;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Component("fileService")
public class FileService {

    private static final Logger LOG = LoggerFactory.getLogger(FileService.class);

    public static final int FILE_NAME_LENGTH = 50;
    @Value("${upload.directory}")
    private String uploadDirectoryName;

    public byte[] inputStreamToBytes(InputStream inputStream) {
        byte[] buffer = null;
        try {
            buffer = IOUtils.toByteArray(inputStream);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return buffer;
    }

    public String inputToOutputFileName(String userId, String fileName) {

        if (StringUtils.length(uploadDirectoryName) < 3 || StringUtils.length(fileName) < 3 || !StringUtils.contains(fileName, '.')) {
            return null;
        }
        String timestamp = System.currentTimeMillis() + "";

        String resultFileName = new String(uploadDirectoryName);
        if (!StringUtils.endsWith(resultFileName, "/")) {
            resultFileName += "/";
        }
        resultFileName = resultFileName + timestamp + FileResource.FILE_NAME_DELIMITER + userId + FileResource.FILE_NAME_DELIMITER + fileName;

        return resultFileName;
    }

    public List<File> listFiles(String sourceDir, String tag) {
        List<File> result = new ArrayList<File>();
        if (StringUtils.isBlank(sourceDir)) {
            return result;
        }

        try {
            File sourceDirFile = new File(sourceDir);
            for (File file : sourceDirFile.listFiles()) {
                boolean addFile = file.isFile();
                if (addFile && StringUtils.isNotBlank(tag)) {
                    addFile = StringUtils.contains(file.getCanonicalPath(), tag);
                }
                if (addFile) {
                    result.add(file);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }

    public boolean writeInputStreamToFile(InputStream inputStream, String fileName) {
        OutputStream outputStream = null;
        try {

            byte[] buffer = new byte[1024];
            outputStream = new FileOutputStream(fileName);
            int bytesRead = 0;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        } catch (Exception exception) {
            LOG.error("Failed to write to file. " + fileName, exception);
            return false;
        } finally {
            try {
                if (outputStream != null) {
                    outputStream.flush();
                    outputStream.close();
                    LOG.debug("File written successfully. " + fileName);
                }
            } catch (IOException e) {
                e.printStackTrace();
                LOG.error("Failed to flush and close file. " + fileName, e);
                return false;
            }
        }
        return true;
    }

    public boolean deleteFile(String serverFileName) {
        if (StringUtils.isBlank(serverFileName)) {
            return false;
        }

        boolean result;
        try {
            String absoluteFileName = uploadDirectoryName + "/" + serverFileName;
            LOG.info("Deleting book file. " + absoluteFileName);
            result = new File(absoluteFileName).delete();
        } catch (Exception e) {
            LOG.error("Error deleting file. " + serverFileName, e);
            result = false;
        }
        return result;
    }

    public File serverFileNameToFileObject(String serverFileName) {
        String absolutePath = uploadDirectoryName;
        if (!StringUtils.endsWith(absolutePath, "/")) {
            absolutePath += "/";
        }
        return new File(absolutePath + serverFileName);
    }
}
