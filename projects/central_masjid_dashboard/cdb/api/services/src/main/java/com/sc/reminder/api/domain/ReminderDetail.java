package com.sc.reminder.api.domain;

import com.sc.reminder.api.domain.enums.SuraName;
import org.apache.commons.lang3.StringUtils;

public class ReminderDetail {

    private int suraNumber;
    private String suraNameArabic;
    private String suraDescription;
    private String suraNameEnglish;
    private AyaDetail ayaDetail;
    private String translationName;

    public ReminderDetail(AyaDetail ayaDetail, String translationName) {
        this.setAyaDetail(ayaDetail);
        this.setTranslationName(translationName);
    }

    public int getSuraNumber() {
        return suraNumber;
    }

    public void setSuraNumber(int suraNumber) {
        this.suraNumber = suraNumber;
    }

    public String getSuraNameArabic() {
        return suraNameArabic;
    }

    public void setSuraNameArabic(String suraNameArabic) {
        this.suraNameArabic = suraNameArabic;
    }

    public String getSuraDescription() {
        return suraDescription;
    }

    public void setSuraDescription(String suraDescription) {
        this.suraDescription = suraDescription;
    }

    public String getSuraNameEnglish() {
        return suraNameEnglish;
    }

    public void setSuraNameEnglish(String suraNameEnglish) {
        this.suraNameEnglish = suraNameEnglish;
    }

    public AyaDetail getAyaDetail() {
        return ayaDetail;
    }

    public void setAyaDetail(AyaDetail ayaDetail) {
        if (ayaDetail == null || ayaDetail.getFirstAyaSuraName() == null) {
            throw new RuntimeException("Can not initialize ReminderDetail. AyaDetail or SuraName is null");
        } else {
            this.ayaDetail = ayaDetail;
            SuraName suraName = ayaDetail.getFirstAyaSuraName();
            this.setSuraNumber(suraName.getSuraNumber());
            this.setSuraNameArabic(suraName.getArabic());
            this.setSuraDescription(suraName.getDescription());
            this.setSuraNameEnglish(suraName.getEnglish());
        }
    }

    public String getTranslationName() {
        return translationName;
    }

    public void setTranslationName(String translationName) {
        if (StringUtils.isBlank(translationName)) {
            throw new RuntimeException("Can not initialize ReminderDetail. TranslationName is blank.");
        } else {

            this.translationName = translationName;
        }
    }
}
