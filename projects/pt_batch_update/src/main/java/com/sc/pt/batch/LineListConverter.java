package com.sc.pt.batch;

import java.util.Arrays;
import java.util.List;

public class LineListConverter {
    public List<String> lineToList(String line) {
        String[] items = line.split(",");
        return Arrays.asList(items);
    }

    public String listToLine(List<String> line) {
        return String.join(",", line);
    }
}
