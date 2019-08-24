package com.sc.cdb.services.common;

import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;

public class DateTimeCalculator {

    private static final Pattern TIME_24_REGEX_PATTERN =
            Pattern.compile("^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$");


    public boolean isValid24Time(String timeInString) {
        int length = StringUtils.length(timeInString);
        if (length > 5 || length < 3) {
            return false;
        }
        return TIME_24_REGEX_PATTERN.matcher(timeInString).matches();
    }
}
