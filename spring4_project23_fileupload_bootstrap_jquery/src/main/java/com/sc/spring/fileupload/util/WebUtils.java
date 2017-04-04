package com.sc.spring.fileupload.util;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class WebUtils {


    public static byte[] inputStreamToBytes(InputStream inputStream) {
        byte[] buffer = null;
        try {
            buffer = IOUtils.toByteArray(inputStream);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return buffer;
    }

    public static String inputToOutputFileName(String directory, String fileName) {

        if (StringUtils.length(directory) < 3 || StringUtils.length(fileName) < 3 || !StringUtils.contains(fileName, '.')) {
            return null;
        }
        String tag = System.currentTimeMillis() + "_";

        String resultFileName = new String(directory);
        if (!StringUtils.endsWith(resultFileName, "/")) {
            resultFileName += "/";
        }
        resultFileName = resultFileName + tag + fileName;

        return resultFileName;
    }

    public static List<File> listFiles(String sourceDir, String tag) {
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

    public static boolean writeInputStreamToFile(InputStream inputStream, String fileName) {
        OutputStream outputStream = null;
        try {

            byte[] buffer = new byte[1024];
            outputStream = new FileOutputStream(fileName);
            int bytesRead = 0;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        } catch (Exception exception) {
            exception.printStackTrace();
            System.out.println("Failed to write to file. " + fileName);
            return false;
        } finally {
            try {
                if (outputStream != null) {
                    outputStream.flush();
                    outputStream.close();
                    System.out.println("File written successfully. " + fileName);
                }
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("Failed to flush and close file. " + fileName);
                return false;
            }
        }
        return true;
    }
}
