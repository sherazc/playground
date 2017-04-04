package com.sc.service;

import com.sc.domain.AyaDetail;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.io.*;
import java.util.List;

public class SearchServiceTest {

    public static String INDEX_FILE = "src/test/resources/data_index.txt";
    public static String QURAN_FILE = "src/test/resources/quran-uthmani.txt";
    public static String TRANSLATION_FILE = "src/test/resources/en.yusufali.txt";

    private SearchService searchService;

    @Before
    public void init() throws Exception {
        searchService = new SearchService(new FileInputStream(INDEX_FILE)) {
            @Override
            protected InputStream openTranslationStream() {
                InputStream inputStream = null;
                try {
                    inputStream = new FileInputStream(TRANSLATION_FILE);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
                return inputStream;
            }

            @Override
            protected InputStream openQuranStream() {
                InputStream inputStream = null;
                try {
                    inputStream = new FileInputStream(QURAN_FILE);
                } catch (FileNotFoundException e) {
                    e.printStackTrace();
                }
                return inputStream;
            }
        };
    }

    @Test
    public void testSearchZeroHistory() throws Exception{
        List<AyaDetail> ayaDetails = searchService.search(0, "en.yusufali");
        Assert.assertNotNull(ayaDetails);
        Assert.assertEquals(1, ayaDetails.size());
    }

    @Test
    public void testSearch10History() throws Exception{
        List<AyaDetail> ayaDetails = searchService.search(10, "en.yusufali");
        Assert.assertNotNull(ayaDetails);
        Assert.assertEquals(11, ayaDetails.size());
    }

}