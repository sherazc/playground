package com.sc.s4.util;

import org.apache.commons.lang3.StringUtils;

public class CommonUtils {

    public static Integer touchInteger(Integer number) {
        if (number == null) {
            return 0;
        } else {
            return number;
        }
    }

    public static Long touchLong(Long number) {
        if (number == null) {
            return 0L;
        } else {
            return number;
        }
    }

    public static String touchString(String string) {
        if (StringUtils.isBlank(string)) {
            return "";
        } else {
            return string;
        }
    }
}
