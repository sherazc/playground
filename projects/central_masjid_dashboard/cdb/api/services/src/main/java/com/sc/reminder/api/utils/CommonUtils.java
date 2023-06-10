package com.sc.reminder.api.utils;

import com.sc.reminder.api.service.SearchFileLine;
import com.sc.reminder.api.service.SearchService;

import java.io.*;
import java.nio.charset.Charset;
import java.util.Calendar;

public class CommonUtils {

    public static final int STARTING_YEAR = 2000;

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

    public static boolean isNotBlank(String string) {
        return string != null && string.trim().length() > 0;
    }

    public static boolean isBlank(String string) {
        return string == null || string.trim().length() < 1;
    }

    public static String displayNameToIndexName(String string) {
        String result = null;
        if (string != null) {
            result = string.replaceAll(" ", "_");
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

    public static String truncate(String string, int length) {
        String result = string;
        if (string != null && string.length() > length) {
            result = string.substring(0, length);
        }
        if (result == null) {
            result = "";
        }
        return result;
    }

    public static String truncateEllipsis(String string, int length) {
        String result = truncate(string, length);
        if (string != null && string.length() > length) {
            result += "...";
        }


        return result;
    }

    public static Calendar makeTimeCalendar(int hour, int minute) {
        Calendar calendar = Calendar.getInstance();
        //calendar.setTimeInMillis(0);
        calendar.set(Calendar.HOUR_OF_DAY, hour);
        calendar.set(Calendar.MINUTE, minute);
        CommonUtils.removeSecondsFromCalendar(calendar);
        //calendar.set(Calendar.YEAR, STARTING_YEAR);
        return calendar;
    }

    public static void removeSecondsFromCalendar(Calendar calendar) {
        if (calendar == null) {
            return;
        }
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
    }
}
