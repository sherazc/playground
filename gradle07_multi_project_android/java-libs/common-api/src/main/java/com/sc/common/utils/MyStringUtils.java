package com.sc.common.utils;

import org.apache.commons.lang3.StringUtils;

public class MyStringUtils {
    private MyStringUtils() {
    }

    public static final boolean isBlank(String string) {
        return string == null || string.trim().length() < 1;
    }

    public static final boolean isNotBlank(String string) {
        return string != null && string.trim().length() > 0;
    }

    public static final boolean contains(String stringData, String stringToSearch) {
        return StringUtils.contains(stringData, stringToSearch);
    }
}
