package com.sc.utils;

import com.sc.service.SearchFileLine;

import java.io.*;

public class CommonUtils {

    private CommonUtils() {
    }

    public static String[] splitLine(String line) {
        String[] result = null;

        if (line != null) {
            result = line.split(SearchFileLine.LINE_DELIMITER);
        }

        return result;
    }

    public static void closeStream(InputStream inputStream) {
        if (inputStream == null) {
            return;
        }

        try {
            inputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void closeReader(Reader reader) {
        if (reader == null) {
            return;
        }

        try {
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static BufferedReader streamToBufferedReader(InputStream inputStream) {
        if (inputStream == null) {
            return null;
        }
        return new BufferedReader(new InputStreamReader(inputStream));
    }

    public static String readLine(BufferedReader reader) {
        String result = null;
        try {
            result = reader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static boolean isNotBlank(String string) {
        return string != null && string.trim().length() > 0;
    }

    public static boolean isBlank(String string) {
        return string == null || string.trim().length() < 1;
    }
}
