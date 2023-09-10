package com.sc.pt.batch;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


public class PtBatchUpdate {
    private final LineListConverter lineListConverter = new LineListConverter();
    private final TimeCalculator timeCalculator = new TimeCalculator();
    private final LineFilters lineFilters = new LineFilters();

    public List<String> fixDate(List<String> ptLines, String from, String to, int column, String dateString) {
        return selectLineStream(ptLines, from, to, column)
                .map(line -> fixLineDate(line, column, dateString))
                .map(lineListConverter::listToLine)
                .collect(Collectors.toList());
    }

    public List<String> addMinutes(List<String> ptLines, String from, String to, int column, int minutes) {
        return selectLineStream(ptLines, from, to, column)
                .map(line -> addLineMinutes(line, column, minutes))
                .map(lineListConverter::listToLine)
                .collect(Collectors.toList());
    }


    private Stream<List<String>> selectLineStream(List<String> ptLines, String from, String to, int column) {
        return ptLines.stream()
                .map(lineListConverter::lineToList)
                .filter(line -> lineFilters.isValidColum(line, column))
                .filter(line -> lineFilters.inRange(line.get(0), from, to));
    }


    private List<String> fixLineDate(List<String> line, int column, String dateString) {
        line.set(column, dateString);
        return line;
    }


    private List<String> addLineMinutes(List<String> line, int column, int minutes) {
        line.set(column, timeCalculator.addMinutes(line.get(column), minutes));
        return line;
    }
}
