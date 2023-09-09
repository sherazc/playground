package com.sc.pt.batch;

import java.util.List;
import java.util.stream.Collectors;


public class PtBatchUpdate {
    private final LineListConverter lineListConverter = new LineListConverter();
    private final TimeCalculator timeCalculator = new TimeCalculator();

    public List<String> fixTime(List<String> ptLines, String from, String to, int column, String time) {

        return null;
    }

    public List<String> change(List<String> ptLines, String from, String to, int column, int minutes) {
        StringDateFilter stringDateFilter = new StringDateFilter(from, to);
        return ptLines.stream()
                .map(lineListConverter::lineToList)
                .filter(line -> stringDateFilter.match(line.get(0)))
                .map(line -> changeTime(line, column, minutes))
                .map(lineListConverter::listToLine)
                .collect(Collectors.toList());
    }

    private List<String> changeTime(List<String> line, int column, int minutes) {
        line.set(column, timeCalculator.addMinutes(line.get(column), minutes));
        return line;
    }
}
