package com.sc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        new Main().run();
    }

    private void run() {
        String fileName = "pt.txt";
        List<String> lines = readLines(fileName);

        PtBatchUpdate ptBatchUpdate = new PtBatchUpdate();

        List<String> changedLines = ptBatchUpdate.change(lines, "01/03", "01/05", 1, 1);

        System.out.println(changedLines);
    }

    private List<String> readLines(String fileName) {
        List<String> lines = new ArrayList<>();
        try {

            BufferedReader bufferedReader = openReader(fileName);
            String line = null;
            boolean skipFirstLine = true;
            while ((line = bufferedReader.readLine()) != null) {
                if (skipFirstLine) {
                    skipFirstLine = false;
                    continue;
                }
                lines.add(line);
            }

            bufferedReader.close();
            System.out.println(bufferedReader);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return lines;
    }


    private BufferedReader openReader(String fileName) throws IOException {
        return new BufferedReader(new InputStreamReader(Main.class.getClassLoader().getResource(fileName).openStream()));
    }
}