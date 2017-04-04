package com.sc.service;

import com.sc.domain.AyaDetail;
import com.sc.domain.Line;
import com.sc.service.random.RandomAyaNumber;
import com.sc.utils.CommonUtils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public abstract class SearchService {

    private static final int MINIMUM_AYA_LENGTH = 200;

    private SearchFileLine searchFileLine;

    public SearchService(InputStream indexInputStream) {
        searchFileLine = new SearchFileLine(indexInputStream);
    }

    public List<AyaDetail> search(int limitHistory, String translationIndexName) {
        List<AyaDetail> result = new ArrayList<AyaDetail>();
        int totalReminders = 1;
        if (limitHistory > 0) {
            totalReminders += limitHistory;
        }

        int daysSinceEpoch = RandomAyaNumber.getInstance().daysSinceEpoch();

        for (int i = 0; i < totalReminders; i++) {
            BufferedReader quranBufferedReader = CommonUtils.streamToBufferedReader(openQuranStream());
            BufferedReader translationBufferedReader = CommonUtils.streamToBufferedReader(openTranslationStream());

            int randomQuranLineNumber = RandomAyaNumber.getInstance().generateRandomAyaNumber(daysSinceEpoch);

            List<Line> ayaLines = new ArrayList<Line>();
            List<Line> translationLines = new ArrayList<Line>();

            String rawAyaLine = searchFileLine.readLine(quranBufferedReader, randomQuranLineNumber,
                    SearchFileLine.DEFAULT_QURAN_INDEX_NAME);
            String rawTranslationLine = searchFileLine.readLine(translationBufferedReader, randomQuranLineNumber,
                    translationIndexName);

            if (rawAyaLine == null || rawTranslationLine == null) {
                break;
            }

            Line ayaLine = new Line(rawAyaLine);
            if (ayaLine.getAyaNumber() == 1) {
                rawAyaLine = CommonUtils.readLine(quranBufferedReader);
                rawTranslationLine = CommonUtils.readLine(translationBufferedReader);
                randomQuranLineNumber++;
            }
            ayaLines.add(ayaLine);
            translationLines.add(new Line(rawTranslationLine));

            int ayasLength = rawAyaLine.length();

            while (ayasLength < MINIMUM_AYA_LENGTH) {

                rawAyaLine = CommonUtils.readLine(quranBufferedReader);
                rawTranslationLine = CommonUtils.readLine(translationBufferedReader);

                ayaLine = new Line(rawAyaLine);

                if (rawAyaLine == null || rawTranslationLine == null || ayaLine.getAyaNumber() == 1) {
                    break;
                }

                ayaLines.add(ayaLine);
                translationLines.add(new Line(rawTranslationLine));
                ayasLength += rawAyaLine.length();
            }

            result.add(new AyaDetail(daysSinceEpoch, randomQuranLineNumber, ayaLines, translationLines));
            daysSinceEpoch--;
        }

        return result;
    }

    protected abstract InputStream openTranslationStream();

    protected abstract InputStream openQuranStream();
}
