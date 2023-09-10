package com.sc.pt.batch;

import java.util.List;

public class LineFilters {

    public boolean inRange(String stringDate, String from, String to){
        return stringDate.compareTo(from) >= 0 && stringDate.compareTo(to) < 1;
    }

    public boolean isValidColum(List<String> line, int column) {
        return true;
    }
}
