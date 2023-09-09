package com.sc.pt;

import com.sc.pt.batch.PtBatchUpdate;
import com.sc.pt.io.CsvReader;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        new Main().run();
    }

    private void run() {
        String fileName = "pt.txt";
        List<String> lines = new CsvReader().readLines(fileName);

        PtBatchUpdate ptBatchUpdate = new PtBatchUpdate();

        List<String> changedLines = ptBatchUpdate.change(lines, "01/03", "01/05", 1, 1);
        changedLines.forEach(System.out::println);
    }
}