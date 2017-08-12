package com.sc.common.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class FileReader {

    public List<String> realAllLines(String fileNameInClasspath) {
        if (MyStringUtils.isBlank(fileNameInClasspath)) {
            return null;
        }
        List<String> allLines = new ArrayList<String>();
        BufferedReader reader = null;
        try {
            InputStream resourceAsStream = FileReader.class.getClassLoader().getResourceAsStream(fileNameInClasspath);
            if (resourceAsStream == null) {
                return null;
            }
            reader = new BufferedReader(new InputStreamReader(
                    resourceAsStream));
            String line = null;
            while ((line = reader.readLine()) != null) {
                allLines.add(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                    return null;
                }
            }
        }

        return allLines;
    }
}
