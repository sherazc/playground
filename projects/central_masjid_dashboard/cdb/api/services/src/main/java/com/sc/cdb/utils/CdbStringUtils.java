package com.sc.cdb.utils;

import com.sc.reminder.api.service.SearchFileLine;
import org.apache.commons.lang3.StringUtils;

public class CdbStringUtils {

    private CdbStringUtils() {
    }

    public static String[] splitLine(String line) {
        String[] result = null;

        if (line != null) {
            result = line.split(SearchFileLine.LINE_DELIMITER);
        }

        return result;
    }


    public static boolean isNotBlank(String string) {
        return string != null && string.trim().length() > 0;
    }

    public static boolean isBlank(String string) {
        return string == null || string.trim().length() < 1;
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

    public static String leftPadNum(int number, int zeros) {
        return StringUtils.leftPad(String.valueOf(number), zeros, "0");
    }

}
