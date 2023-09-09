package com.sc.pt.io;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class CsvReader {
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

    private BufferedReader openReader(String fileName) throws IOException {
        URL resource = CsvReader.class.getClassLoader().getResource(fileName);
        if (resource == null) {
            throw new IOException("Failed to find resource file=" + fileName);
        } else {
            return new BufferedReader(new InputStreamReader(resource.openStream()));
        }
    }
}
