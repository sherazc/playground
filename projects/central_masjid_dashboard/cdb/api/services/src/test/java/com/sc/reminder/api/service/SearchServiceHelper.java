package com.sc.reminder.api.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

public class SearchServiceHelper {
    public static SearchService createSearchService(String quranFile, String translationFile) {
        return new SearchService() {
            @Override
            protected InputStream openQuranStream() {
                try {
                    return Files.newInputStream(Paths.get("../webservices/src/main/resources/quran/" + quranFile));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

            @Override
            protected InputStream openTranslationStream() {
                try {
                    return Files.newInputStream(Paths.get("../webservices/src/main/resources/quran/" + translationFile));
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        };
    }
}
