package com.sc.domain;

import com.sc.domain.enums.SuraName;
import com.sc.utils.CommonUtils;

import java.util.List;

public class AyaDetail {

    private int sequenceNumberSeed;
    private int quranLineNumber;
    private SuraName suraName;
    private List<Line> ayas;
    private List<Line> translations;


    public AyaDetail(int sequenceNumberSeed, int quranLineNumber, List<Line> ayas, List<Line> translations) {
        this.sequenceNumberSeed = sequenceNumberSeed;
        this.quranLineNumber = quranLineNumber;
        this.ayas = ayas;
        this.translations = translations;
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
                if (CommonUtils.isBlank(line.getLineString())) {
                    continue;
                }

                stringBuilder.append(line.getLineString())
                        .append(" (")
                        .append(line.getAyaNumber())
                        .append(") ");

            }
        }

        return stringBuilder.toString();
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
}
