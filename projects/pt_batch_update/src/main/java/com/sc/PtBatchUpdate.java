package com.sc;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class PtBatchUpdate {

    public List<String> change(List<String> ptLines, String from, String to, int column, int minutes) {

        List<Object> collect = ptLines.stream()
                .map(this::lineToArray)
                .filter(line -> line.get(0).compareTo(from) >= 0 && line.get(0).compareTo(to) < 1)
                .map(line -> changeTime(line, column, minutes))
                .collect(Collectors.toList());


        System.out.println(collect);

        return null;
    }

    private List<String> changeTime(List<String> line, int column, int minutes) {
        line.set(column, "abc");
        //line.set(column, ct(line.get(column), minutes));
        return line;
    }

    private String ct(String time, int minutes) {
        return null;
    }

    private List<String> lineToArray(String line) {
        String[] items = line.split(",");
        return Arrays.asList(items);
    }

}
