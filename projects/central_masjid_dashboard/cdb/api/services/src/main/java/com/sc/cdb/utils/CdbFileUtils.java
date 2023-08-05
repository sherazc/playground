package com.sc.cdb.utils;

import com.sc.reminder.api.service.SearchService;

import java.io.*;
import java.nio.charset.Charset;

public class CdbFileUtils {
    private CdbFileUtils() {
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
        return new BufferedReader(new InputStreamReader(inputStream, Charset.forName("UTF-8")));
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

    public static String indexNameToFileName(String string) {
        String result = null;
        if (string != null) {
            result = string + SearchService.FILE_EXTENSION;
        }
        return result;
    }

    public static String displayNameToFileName(String string) {
        return indexNameToFileName(displayNameToIndexName(string));
    }

    public static String displayNameToIndexName(String string) {
        String result = null;
        if (string != null) {
            result = string.replaceAll(" ", "_");
        }
        return result;
    }
}
