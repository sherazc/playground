package com.sc.cdb.services.common;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class TestUtils {
    public static <T> T readJsonObject(String fileName, Class<T> klass) {
        T jsonObject;
        try {
            String pcString = Files.readString(Paths.get(klass.getClassLoader()
                    .getResource(fileName).toURI()));

            jsonObject = new ObjectMapper().readValue(pcString, klass);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return jsonObject;
    }


    public static <T> List<T> readJsonList(String fileName, Class<T> klass) {
        List<T> jsonList;
        try {
            String pcString = Files.readString(Paths.get(klass.getClassLoader()
                    .getResource(fileName).toURI()));

            jsonList = new ObjectMapper().readValue(pcString, new ArrayList<T>().getClass());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return jsonList;
    }
}
