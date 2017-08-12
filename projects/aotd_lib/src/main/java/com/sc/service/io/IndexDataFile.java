package com.sc.service.io;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class IndexDataFile {
    public static final int BUFFER_BYTES_LINE = 20;
    public static final String INDEX_DELIMITER = "@";
    // public static final char CR = '\r';
    public static final char LF = '\n';
    public static final String DATA_INDEX_FILE_NAME = "src/main/resources/data_index.txt";

    public static void main(String[] args) throws Exception {

        List<String> dataFiles = new ArrayList<String>();
        dataFiles.add("src/main/resources/quran-uthmani.txt");
        dataFiles.add("src/main/resources/en.yusufali.txt");

        new IndexDataFile().run(dataFiles);
    }

    private void run(List<String> dataFiles) throws Exception {

        BufferedWriter writer = new BufferedWriter(new FileWriter(DATA_INDEX_FILE_NAME, false));

        writer.write("quran-uthmani" + INDEX_DELIMITER);
        writer.write(createDataFileIndex("src/main/resources/quran-uthmani.txt"));

        writer.write(LF);

        writer.write("en.yusufali" + INDEX_DELIMITER);
        writer.write(createDataFileIndex("src/main/resources/en.yusufali.txt"));

        writer.close();

        System.out.println("Done.");
    }

    private String createDataFileIndex(String dataFile) throws IOException {
        StringBuilder fileIndexString = new StringBuilder(BUFFER_BYTES_LINE + INDEX_DELIMITER);

        BufferedReader reader = new BufferedReader(new FileReader(dataFile));

        int intChar = 0;
        int lineCount = 0;
        long byteCount = 0;

        while ((intChar = reader.read()) != -1) {
            char readChar = (char) intChar;
            byteCount++;
            if (readChar == LF) {
                lineCount++;
                if (lineCount % BUFFER_BYTES_LINE == 0) {
                    fileIndexString.append(byteCount).append(INDEX_DELIMITER);
                }
            }
        }

        reader.close();
        return fileIndexString.toString();
    }
}
