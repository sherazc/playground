package com.sc.java18a.eg01charset;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

public class DefaultUtf8Charset {

    public static final String TEMP_FILE = "temp.log";

    public static void main(String[] args) throws IOException {
        Files.deleteIfExists(Paths.get(TEMP_FILE));
        System.out.println("Default charset : " + Charset.defaultCharset());
        System.out.println("file.encoding   : " + System.getProperty("file.encoding"));
        System.out.println("native.encoding : " + System.getProperty("native.encoding"));

        try (FileWriter fileWriter = new FileWriter(TEMP_FILE);
             BufferedWriter bufferedWriter = new BufferedWriter(fileWriter)) {
             bufferedWriter.write("بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ");
        }

        try (FileReader fileReader = new FileReader(TEMP_FILE);
             BufferedReader bufferedReader = new BufferedReader(fileReader)) {
            System.out.println(bufferedReader.readLine());
        }
    }
}
