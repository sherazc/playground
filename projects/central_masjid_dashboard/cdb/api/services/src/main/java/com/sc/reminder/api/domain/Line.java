package com.sc.reminder.api.domain;


import com.sc.cdb.utils.CdbStringUtils;

public class Line {
    private int suraNumber;
    private int ayaNumber;
    private String lineString;

    public Line(String rawLineString) {
        String[] lineItems = CdbStringUtils.splitLine(rawLineString);
        if (lineItems != null && lineItems.length > 2) {
            setSuraNumber(Integer.parseInt(lineItems[0].trim()));
            setAyaNumber(Integer.parseInt(lineItems[1].trim()));
            setLineString(lineItems[2].trim());
        }
    }

    public Line(int suraNumber, int ayaNumber, String lineString) {
        this.suraNumber = suraNumber;
        this.ayaNumber = ayaNumber;
        this.lineString = lineString;
    }

    public int getSuraNumber() {
        return suraNumber;
    }

    public void setSuraNumber(int suraNumber) {
        this.suraNumber = suraNumber;
    }

    public int getAyaNumber() {
        return ayaNumber;
    }

    public void setAyaNumber(int ayaNumber) {
        this.ayaNumber = ayaNumber;
    }

    public String getLineString() {
        return lineString;
    }

    public void setLineString(String lineString) {
        this.lineString = lineString;
    }
}
