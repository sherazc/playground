package com.sc.reminder.api.service;

import com.sc.reminder.api.domain.AyaDetail;
import com.sc.reminder.api.domain.Line;
import com.sc.reminder.api.service.random.RandomAyaNumber;
import com.sc.reminder.api.utils.CommonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;


public abstract class SearchService {
    private static final Logger LOG = LoggerFactory.getLogger(SearchService.class);

    public static final int HISTORY_DAYS = 6;
    public static final String FILE_EXTENSION = ".txt";
    public static final int MINIMUM_AYA_LENGTH = 150;
    private String translationDisplayName;

    private final SearchFileLine searchFileLine;

    public SearchService() {
        searchFileLine = new SearchFileLine();
    }


    public List<AyaDetail> search(int limitHistory) {
        return this.search(limitHistory, RandomAyaNumber.getInstance().daysSinceEpoch());
    }

    public List<AyaDetail> search(int limitHistory, int seed) {
        LOG.debug("Searching for AyaDetail. limitHistory = {}", limitHistory);
        List<AyaDetail> result = new ArrayList<AyaDetail>();
        if(CommonUtils.isBlank(getTranslationDisplayName())) {
            return result;
        }
        int totalReminders = 1;
        if (limitHistory > 0) {
            totalReminders += limitHistory;
        }

        Calendar calendar = Calendar.getInstance();

        for (int i = 0; i < totalReminders; i++) {
            BufferedReader quranBufferedReader = CommonUtils.streamToBufferedReader(openQuranStream());
            BufferedReader translationBufferedReader = CommonUtils.streamToBufferedReader(openTranslationStream());

            int randomQuranLineNumber = RandomAyaNumber.getInstance().generateRandomAyaNumber(seed);
            LOG.debug("seed = {}", seed);
            LOG.debug("randomQuranLineNumber = {}", randomQuranLineNumber);
            List<Line> ayaLines = new ArrayList<Line>();
            List<Line> translationLines = new ArrayList<Line>();

            String rawAyaLine = searchFileLine.readLine(quranBufferedReader, randomQuranLineNumber);
            String rawTranslationLine = searchFileLine.readLine(translationBufferedReader, randomQuranLineNumber);

            LOG.debug("rawAyaLine = {}", rawAyaLine);
            LOG.debug("rawTranslationLine = {}", rawTranslationLine);
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

            result.add(new AyaDetail(seed, randomQuranLineNumber, ayaLines, translationLines, calendar.getTime()));

            calendar.add(Calendar.DATE, -1);
            seed--;
            CommonUtils.closeReader(quranBufferedReader);
            CommonUtils.closeReader(translationBufferedReader);
        }

        return result;
    }


    // I think this method was used in Android's Reminder of the day app.
    public List<AyaDetail> updateTranslation(List<AyaDetail> activityAyaDetails) {
        if (activityAyaDetails == null || activityAyaDetails.size() < 1) {
            return this.search(SearchService.HISTORY_DAYS);
        }
        for (AyaDetail ayaDetail : activityAyaDetails) {
            BufferedReader translationBufferedReader = CommonUtils.streamToBufferedReader(openTranslationStream());
            List<Line> ayas = ayaDetail.getAyas();
            List<Line> translations = ayaDetail.getTranslations();

            if (ayas != null && translations != null && ayas.size() > 0 && ayas.size() == translations.size()) {

                String rawTranslationLine = searchFileLine.readLine(translationBufferedReader, ayaDetail.getQuranLineNumber());

                updateLine(translations.get(0), rawTranslationLine);

                for (int i = 1; i < ayas.size(); i++){
                    rawTranslationLine = CommonUtils.readLine(translationBufferedReader);
                    updateLine(translations.get(i), rawTranslationLine);
                }
            }
            CommonUtils.closeReader(translationBufferedReader);
        }
        return activityAyaDetails;
    }

    private void updateLine(Line line, String rawLine) {
        Line newLine = new Line(rawLine);
        line.setLineString(newLine.getLineString());
        line.setAyaNumber(newLine.getAyaNumber());
        line.setSuraNumber(newLine.getSuraNumber());
    }


    protected abstract InputStream openTranslationStream();

    protected abstract InputStream openQuranStream();


    public String getTranslationDisplayName() {
        return translationDisplayName;
    }

    public void setTranslationDisplayName(String translationDisplayName) {
        this.translationDisplayName = translationDisplayName;
    }
}
