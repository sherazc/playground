package com.sc.reminder.api.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sc.cdb.data.common.util.Constants;
import com.sc.cdb.utils.CdbStringUtils;
import com.sc.reminder.api.domain.enums.SuraName;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class AyaDetail {

    private static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("EEEE, MMMM d, yyyy");
    private int sequenceNumberSeed;
    private int quranLineNumber;
    private SuraName suraName;
    private List<Line> ayas;
    private List<Line> translations;

    @JsonFormat(pattern= Constants.DATE_TIME_FORMAT)
    private Date date;

    public AyaDetail(int sequenceNumberSeed, int quranLineNumber, List<Line> ayas, List<Line> translations, Date date) {
        this.sequenceNumberSeed = sequenceNumberSeed;
        this.quranLineNumber = quranLineNumber;
        this.ayas = ayas;
        this.translations = translations;
        this.date = date;
    }

    public String combineAllAyaLines() {
        return combineAllLines(ayas);
    }

    public String combineAllTranslationLines() {
        return combineAllLines(translations);
    }


    private String combineAllLines(List<Line> lines) {
        StringBuilder stringBuilder = new StringBuilder();

        if (lines != null && lines.size() > 0) {
            for (Line line : lines) {
                if (CdbStringUtils.isBlank(line.getLineString())) {
                    continue;
                }

                stringBuilder.append(line.getLineString())
                        .append(" (")
                        .append(line.getAyaNumber())
                        .append(")\n");

            }
        }

        return stringBuilder.append('\n').toString();
    }

    public SuraName getFirstAyaSuraName() {

        if (suraName == null && ayas != null && ayas.size() > 0) {
            Line firstAyaLine = ayas.get(0);
            if (firstAyaLine.getSuraNumber() > 0) {
                suraName = SuraName.findBySuraNumber(firstAyaLine.getSuraNumber());
            }
        }

        return suraName;
    }

    public int getSequenceNumberSeed() {
        return sequenceNumberSeed;
    }

    public void setSequenceNumberSeed(int sequenceNumberSeed) {
        this.sequenceNumberSeed = sequenceNumberSeed;
    }

    public int getQuranLineNumber() {
        return quranLineNumber;
    }

    public void setQuranLineNumber(int quranLineNumber) {
        this.quranLineNumber = quranLineNumber;
    }

    public List<Line> getAyas() {
        return ayas;
    }

    public void setAyas(List<Line> ayas) {
        this.ayas = ayas;
    }

    public List<Line> getTranslations() {
        return translations;
    }

    public void setTranslations(List<Line> translations) {
        this.translations = translations;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDisplayDate() {
        String displayDate = "";
        if (date != null) {
            displayDate = SIMPLE_DATE_FORMAT.format(date);
        }
        return displayDate;
    }
}
