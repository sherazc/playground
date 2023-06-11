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
            System.out.println(ayaDetails);


            assertFalse(ayaDetails.isEmpty());

            ayaDetails.forEach(this::assertAya);
        }

    }

    private void assertAya(AyaDetail ayaDetail) {
        assertNotNull(ayaDetail);
        assertEquals(ayaDetail.getAyas().size(), ayaDetail.getTranslations().size());
        for (int i = 0; i < ayaDetail.getAyas().size(); i++) {
            Line aya = ayaDetail.getAyas().get(i);
            Line translation = ayaDetail.getTranslations().get(i);
            assertEquals(aya.getAyaNumber(), translation.getAyaNumber());
            assertEquals(aya.getSuraNumber(), translation.getSuraNumber());
            assertTrue(StringUtils.isNotBlank(aya.getLineString()));
            assertTrue(StringUtils.isNotBlank(translation.getLineString()));
        }
    }
}