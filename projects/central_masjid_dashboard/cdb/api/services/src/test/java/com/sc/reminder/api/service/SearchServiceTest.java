package com.sc.reminder.api.service;

import com.sc.reminder.api.domain.AyaDetail;
import com.sc.reminder.api.domain.Line;
import com.sc.reminder.api.service.random.RandomAyaNumber;
import org.apache.commons.lang3.StringUtils;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

class SearchServiceTest {

    @Test
    void search() {
        SearchService searchService = SearchServiceHelper.createSearchService(
                "quran-uthmani.txt", "English_-_Saheeh_International.txt");
        searchService.setTranslationDisplayName("English_-_Saheeh_International");

        int start = RandomAyaNumber.getInstance().daysSinceEpoch() - 100;
        int end = start + 2000;
        for (int seed = start; seed < end; seed++) {
            if (seed == 8629) {
                System.out.println();
            }
            List<AyaDetail> ayaDetails = searchService.search(0, seed);
            assertFalse(ayaDetails.isEmpty());
            ayaDetails.forEach(this::assertAya);
        }
    }

    private void assertAya(AyaDetail ayaDetail) {
        assertNotNull(ayaDetail);
        assertEquals(ayaDetail.getAyas().size(), ayaDetail.getTranslations().size());
        int expectedSurahNumber = ayaDetail.getAyas().get(0).getSuraNumber();
        for (int i = 0; i < ayaDetail.getAyas().size(); i++) {
            Line aya = ayaDetail.getAyas().get(i);
            Line translation = ayaDetail.getTranslations().get(i);
            assertEquals(expectedSurahNumber, aya.getSuraNumber());
            assertEquals(expectedSurahNumber, translation.getSuraNumber());
            assertEquals(aya.getAyaNumber(), translation.getAyaNumber());
            assertEquals(aya.getSuraNumber(), translation.getSuraNumber());
            assertTrue(StringUtils.isNotBlank(aya.getLineString()));
            assertTrue(StringUtils.isNotBlank(translation.getLineString()));
            if(i > 0) {
                Line ayaPrevious = ayaDetail.getAyas().get(i - 1);
                Line translationPrevious = ayaDetail.getTranslations().get(i - 1);
                assertEquals(aya.getAyaNumber(), ayaPrevious.getAyaNumber() + 1);
                assertEquals(translation.getAyaNumber(), translationPrevious.getAyaNumber() + 1);
            }
        }
    }
}