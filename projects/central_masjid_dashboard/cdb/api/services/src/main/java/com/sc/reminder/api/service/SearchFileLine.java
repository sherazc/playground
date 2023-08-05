package com.sc.reminder.api.service;

import com.sc.cdb.utils.CdbFileUtils;

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
                String temp = CdbFileUtils.readLine(reader);
                if (temp == null) {
                    break;
                }
            } else {
                result = CdbFileUtils.readLine(reader);
            }
        }
        return result;
    }
}
