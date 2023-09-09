package com.sc.pt.io;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

public class CsvReader extends FileLineReaders {

    public BufferedReader openReader(String fileName) throws IOException {
        URL resource = CsvReader.class.getClassLoader().getResource(fileName);
        if (resource == null) {
            throw new IOException("Failed to find resource file=" + fileName);
        } else {
            return new BufferedReader(new InputStreamReader(resource.openStream()));
        }
    }
}
