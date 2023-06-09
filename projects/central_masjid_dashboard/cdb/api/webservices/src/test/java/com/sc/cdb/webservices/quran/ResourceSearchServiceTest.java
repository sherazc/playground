package com.sc.cdb.webservices.quran;

import com.sc.reminder.api.domain.AyaDetail;
import com.sc.reminder.api.service.SearchService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class ResourceSearchServiceTest {

    private SearchService searchService;

    @BeforeEach
    void setUp() {
        searchService = new ResourceSearchService();
        searchService.setTranslationDisplayName("English_-_Saheeh_International");
    }

    @Test
    void search() {
        List<AyaDetail> ayaDetails = searchService.search(1);
        Assertions.assertEquals(2, ayaDetails.size());
    }
}