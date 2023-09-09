package com.sc.pt.io;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class TxtFileReader extends FileLineReaders {

    @Override
    public BufferedReader openReader(String fileName) throws IOException {
        return new BufferedReader(new FileReader(fileName));
    }
}
