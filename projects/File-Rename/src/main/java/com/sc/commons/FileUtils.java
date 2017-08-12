package com.sc.commons;

import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class FileUtils {

    private int collectFileCountCount = 0;

    private FileUtils() {
    }

    public static List<File> allDirectoryFiles(String directoryPath) {
        if (StringUtils.isBlank(directoryPath)) {
            return null;
        }
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            return null;
        }
        List<File> fileCollection = new ArrayList<>();

        if (directory.isFile()) {
            fileCollection.add(directory);
        } else {
            new FileUtils().collectAllDirectoryFiles(directory, fileCollection);
        }
        return fileCollection;
    }

    public static int countDirectoryFiles(String directoryPath) {
        if (StringUtils.isBlank(directoryPath)) {
            return 0;
        }
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            return 0;
        }
        if (directory.isFile()) {
            return 1;
        }
        FileUtils utils = new FileUtils();
        utils.collectFileCount(directoryPath);
        return utils.collectFileCountCount;
    }

    private void collectAllDirectoryFiles(File directory, List<File> filesCollection) {
        if (directory == null || directory.isFile()) {
            return;
        }

        File[] files = directory.listFiles();
        if (files != null) {
            for (File directoryFile : files) {
                if (directoryFile.isDirectory()) {
                    collectAllDirectoryFiles(directoryFile, filesCollection);
                } else {
                    filesCollection.add(directoryFile);
                }
            }
        }
    }

    private void collectFileCount(String directoryPath) {
        File directory = new File(directoryPath);

        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    collectFileCount(file.getAbsolutePath());
                } else {
                    this.collectFileCountCount++;
                }
            }
        }
    }

    public static void main(String[] args) {
        String directoryPath = "C:/";

        long startMilli = System.currentTimeMillis();
        List<File> files = FileUtils.allDirectoryFiles(directoryPath);
        System.out.println("Time Taken allDirectoryFiles: " + (System.currentTimeMillis() - startMilli));
        System.out.println("Total Files allDirectoryFiles: " + files.size());

        startMilli = System.currentTimeMillis();
        int fileCount = FileUtils.countDirectoryFiles(directoryPath);
        System.out.println("Time Taken countDirectoryFiles: " + (System.currentTimeMillis() - startMilli));
        System.out.println("Total Files countDirectoryFiles: " + fileCount);
    }
}
