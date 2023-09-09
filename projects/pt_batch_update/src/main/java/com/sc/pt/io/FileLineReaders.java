package com.sc.pt.io;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public abstract class FileLineReaders {

    public List<String> readLines(String fileName) {
        List<String> lines = new ArrayList<>();
        try {

            BufferedReader bufferedReader = openReader(fileName);
            String line;
            boolean skipFirstLine = true;
            while ((line = bufferedReader.readLine()) != null) {
                if (skipFirstLine) {
                    skipFirstLine = false;
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
