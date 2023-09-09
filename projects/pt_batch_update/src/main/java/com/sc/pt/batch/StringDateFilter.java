package com.sc.pt.batch;

public class StringDateFilter {
    private String from;
    private String to;

    public StringDateFilter(String from, String to) {
        this.from = from;
        this.to = to;
    }

    public boolean match(String stringDate){
        return stringDate.compareTo(from) >= 0 && stringDate.compareTo(to) < 1;
    }
}
