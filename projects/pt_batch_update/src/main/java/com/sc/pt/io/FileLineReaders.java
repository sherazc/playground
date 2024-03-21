package com.sc.pt.io;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public abstract class FileLineReaders {

    public List<String> readLines(String fileName) {
        return this.readLines(fileName, true);
    }

    public List<String> readLines(String fileName, boolean skipFirstLine) {
        List<String> lines = new ArrayList<>();
        try {

            BufferedReader bufferedReader = openReader(fileName);
            String line;
            boolean skipedFirstLine = !skipFirstLine;
            while ((line = bufferedReader.readLine()) != null) {
                if (!skipedFirstLine) {
                    skipedFirstLine = true;
                    continue;
                }
                lines.add(line);
            }
            bufferedReader.close();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return lines;
    }

    public abstract BufferedReader openReader(String fileName) throws IOException;
}
