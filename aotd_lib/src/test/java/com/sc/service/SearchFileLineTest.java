package com.sc.service;

import com.sc.service.random.RandomAyaNumber;
import com.sc.utils.CommonUtils;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.FileInputStream;

public class SearchFileLineTest {

    public static String INDEX_FILE = "src/test/resources/data_index.txt";
    public static String QURAN_FILE = "src/test/resources/quran-uthmani.txt";
    public static String TRANSLATION_FILE = "src/test/resources/en.yusufali.txt";

    public static String QURAN_INDEX_NAME = "quran-uthmani";
    public static String TRANSLATION_INDEX_NAME = "en.yusufali";

    private SearchFileLine searchFileLine = null;
    private RandomAyaNumber randomAyaNumber = null;

    private BufferedReader quranBufferedReader = null;
    private BufferedReader translationBufferedReader = null;


    @Before
    public void init() throws Exception {
        searchFileLine = new SearchFileLine(new FileInputStream(INDEX_FILE));
        randomAyaNumber = new RandomAyaNumber();

        quranBufferedReader = CommonUtils.streamToBufferedReader(new FileInputStream(QURAN_FILE));
        translationBufferedReader = CommonUtils.streamToBufferedReader(new FileInputStream(TRANSLATION_FILE));

    }

    @After
    public void destroy() {
        CommonUtils.closeReader(quranBufferedReader);
        CommonUtils.closeReader(translationBufferedReader);
    }

    @Test
    public void testNegativeLineSearch() throws Exception {
        int lineNumber = -100;

        String lineText = searchFileLine.readLine(quranBufferedReader, lineNumber, QURAN_INDEX_NAME);
        Assert.assertNull(lineText);

        lineText = searchFileLine.readLine(translationBufferedReader, lineNumber, TRANSLATION_INDEX_NAME);
        Assert.assertNull(lineText);
    }

    @Test
    public void testInvalidLineSearch() throws Exception {
        int lineNumber = 9999;

        String lineText = searchFileLine.readLine(quranBufferedReader, lineNumber, QURAN_INDEX_NAME);
        Assert.assertNull(lineText);

        lineText = searchFileLine.readLine(translationBufferedReader, lineNumber, TRANSLATION_INDEX_NAME);
        Assert.assertNull(lineText);
    }

    @Test
    public void testValidLineSearch() throws Exception {
        int lineNumber = 100;

        String lineText = searchFileLine.readLine(quranBufferedReader, lineNumber, QURAN_INDEX_NAME);
        Assert.assertNotNull(lineText);
        Assert.assertTrue(lineText.length() > 0);

        lineText = searchFileLine.readLine(translationBufferedReader, lineNumber, TRANSLATION_INDEX_NAME);
        Assert.assertNotNull(lineText);
        Assert.assertTrue(lineText.length() > 0);
    }

    @Test
    public void testTodayLineSearch() throws Exception {
        int todayRandomAyaNumber = randomAyaNumber.generateRandomAyaNumber();

        String lineText = searchFileLine.readLine(quranBufferedReader, todayRandomAyaNumber, QURAN_INDEX_NAME);
        Assert.assertNotNull(lineText);
        Assert.assertTrue(lineText.length() > 0);

        lineText = searchFileLine.readLine(translationBufferedReader, todayRandomAyaNumber, TRANSLATION_INDEX_NAME);
        Assert.assertNotNull(lineText);
        Assert.assertTrue(lineText.length() > 0);
    }
}
