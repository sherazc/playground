package com.sc.reminder.api.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.*;

class SearchFileLineTest {

    @BeforeEach
    void setUp() {
    }

    @Test
    void readLine() {
        // InputStream dataIndexStream = openResourceInputStream("/quran/data_index.txt");

        // InputStream quranStream2 = openResourceInputStream("/quran/quran-uthmani.txt");

//        SearchFileLine searchFileLine = new SearchFileLine(dataIndexStream);
//
//        System.out.println(searchFileLine);


    }


    private InputStream openResourceInputStream(String resourceName) {
        InputStream inputStream = null;
        try {
            File file = new File("../webservices/src/main/resources" + resourceName);
            inputStream = new FileInputStream(file);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return inputStream;
    }
}