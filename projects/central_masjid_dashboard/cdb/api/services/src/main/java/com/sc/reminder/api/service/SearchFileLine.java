package com.sc.reminder.api.service;

import com.sc.reminder.api.utils.CommonUtils;

import java.io.BufferedReader;

public class SearchFileLine {
    public static final String LINE_DELIMITER = "\\|";

    public String readLine(BufferedReader reader, int lineNumber) {
        if (lineNumber < 0 || reader == null) {
            return "";
        }
        String result = "";
        for (int i = 0; i < lineNumber; i++) {
            if (i < lineNumber-1) {
                String temp = CommonUtils.readLine(reader);
                if (temp == null) {
                    break;
                }
            } else {
                result = CommonUtils.readLine(reader);
            }
        }
        return result;
    }
}
