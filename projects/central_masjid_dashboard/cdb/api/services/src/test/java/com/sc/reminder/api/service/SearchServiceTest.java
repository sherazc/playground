package com.sc.reminder.api.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;

class SearchServiceTest {

    private SearchService searchService;

    @BeforeEach
    void setUp() {
        searchService = new SearchService() {
            @Override
            protected InputStream openTranslationStream() {
                try {
                    return Files.newInputStream(Paths.get("../webservices/src/main/resources/quran/quran-uthmani.txt"));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            protected InputStream openQuranStream() {
                try {
                    return Files.newInputStream(Paths.get("../webservices/src/main/resources/quran/quran-uthmani.txt"));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        };
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void search() {
    }
}