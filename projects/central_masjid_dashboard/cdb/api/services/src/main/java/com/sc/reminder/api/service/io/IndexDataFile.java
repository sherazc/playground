package com.sc.reminder.api.service.io;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class IndexDataFile {
    public static final int BUFFER_BYTES_LINE = 20;
    public static final String INDEX_DELIMITER = "@";
    // public static final char CR = '\r';
    public static final char LF = '\n';
    public static final String BASE_FILE_PATH = "./java-libs/rotd-api/src/test/resources/";
    public static final String DATA_INDEX_FILE_NAME = BASE_FILE_PATH + "data_index.txt";

    public static void main(String[] args) throws Exception {

        List<String> dataFiles = new ArrayList<String>();
        dataFiles.add(BASE_FILE_PATH + "quran-uthmani.txt");
        dataFiles.add(BASE_FILE_PATH + "Bengali_-_Muhiuddin_Khan.txt");
        dataFiles.add(BASE_FILE_PATH + "Bengali_-_Zohurul_Hoque.txt");
        dataFiles.add(BASE_FILE_PATH + "English_-_Abdullah_Yusuf_Ali.txt");
        dataFiles.add(BASE_FILE_PATH + "English_-_Ahmed_Raza_Khan.txt");
        dataFiles.add(BASE_FILE_PATH + "English_-_Saheeh_International.txt");
        dataFiles.add(BASE_FILE_PATH + "French_-_Muhammad_Hamidullah.txt");
        dataFiles.add(BASE_FILE_PATH + "German_-_Abu_Rida_Muhammad_ibn_Ahmad_ibn_Rassoul.txt");
        dataFiles.add(BASE_FILE_PATH + "Hindi_-_Muhammad_Farooq_Khan_and_Muhammad_Ahmed.txt");
        dataFiles.add(BASE_FILE_PATH + "Hindi_-_Suhel_Farooq_Khan_and_Saifur_Rahman_Nadwi.txt");
        dataFiles.add(BASE_FILE_PATH + "Indonesian_-_Indonesian_Ministry_of_Religious_Affairs.txt");
        dataFiles.add(BASE_FILE_PATH + "Persian_-_Mahdi_Elahi_Ghomshei.txt");
        dataFiles.add(BASE_FILE_PATH + "Spanish_-_Muhammad_Isa_Garcia.txt");
        dataFiles.add(BASE_FILE_PATH + "Urdu_-_Abul_Aala_Maududi.txt");
        dataFiles.add(BASE_FILE_PATH + "Urdu_-_Ahmed_Raza_Khan.txt");
        dataFiles.add(BASE_FILE_PATH + "Urdu_-_Fateh_Muhammad_Jalandhry.txt");

        new IndexDataFile().run(dataFiles);
    }

    private void run(List<String> dataFiles) throws Exception {

        BufferedWriter writer = new BufferedWriter(new FileWriter(DATA_INDEX_FILE_NAME, false));

        for (String dataFile : dataFiles) {
            String indexName = dataFile.substring(dataFile.lastIndexOf('/') + 1, dataFile.lastIndexOf('.'));
            System.out.println(indexName);
            writer.write(indexName + INDEX_DELIMITER);
            writer.write(createDataFileIndex(dataFile));
            writer.write(LF);
        }
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
