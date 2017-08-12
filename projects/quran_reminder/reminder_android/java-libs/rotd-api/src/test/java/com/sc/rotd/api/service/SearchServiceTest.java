package com.sc.rotd.api.service;

import com.sc.rotd.api.domain.AyaDetail;
import com.sc.rotd.api.service.io.IndexDataFile;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

public class SearchServiceTest {

    private static final String BASE_FILE_PATH = "src/test/resources/";


    public static String INDEX_FILE = BASE_FILE_PATH + "data_index.txt";
    public static String QURAN_FILE = BASE_FILE_PATH + "quran-uthmani.txt";
    public static String TRANSLATION_FILE = BASE_FILE_PATH + "English_-_Abdullah_Yusuf_Ali.txt";

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
    public void testSearchZeroHistory() throws Exception {
        searchService.setTranslationDisplayName("English_-_Abdullah_Yusuf_Ali");
        List<AyaDetail> ayaDetails = searchService.search(0);
        Assert.assertNotNull(ayaDetails);
        Assert.assertEquals(1, ayaDetails.size());
    }

    @Test
    public void testSearch10History() throws Exception {
        searchService.setTranslationDisplayName("English_-_Abdullah_Yusuf_Ali");
        List<AyaDetail> ayaDetails = searchService.search(10);
        Assert.assertNotNull(ayaDetails);
        Assert.assertEquals(11, ayaDetails.size());
    }

}