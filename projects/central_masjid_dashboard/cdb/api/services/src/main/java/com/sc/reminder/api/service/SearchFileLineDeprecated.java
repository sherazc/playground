package com.sc.reminder.api.service;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

@Deprecated
public class SearchFileLineDeprecated {

    private static final String INDEX_DELIMITER = "@";
    private static final String LINE_DELIMITER = "\\|";

    public static final String DEFAULT_QURAN_INDEX_NAME = "quran-uthmani";

    private Map<String, String[]> indexMap = new HashMap<String, String[]>();

    public SearchFileLineDeprecated(InputStream indexInputStream) {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(indexInputStream));
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.length() > 0) {
                    String[] lineArray = line.split(INDEX_DELIMITER);
                    if (lineArray.length > 2) {
                        indexMap.put(lineArray[0], lineArray);
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    public String readLine(BufferedReader reader, int lineNumber, String indexName) {
        String result = null;
        if (reader == null || lineNumber < 0 || indexName == null || indexName.length() < 1) {
            return null;
        }

        String[] indexArray = indexMap.get(indexName);
        int indexLinesDistance = Integer.parseInt(indexArray[1]);
        int walkLines = lineNumber;
        boolean inputLineGreaterThanDocument = false;
        try {
            if (lineNumber >= indexLinesDistance) {
                int indexArrayPosition = (lineNumber / indexLinesDistance) + 1;
                long skipBytes = 0;
                if (indexArrayPosition < indexArray.length) {
                    skipBytes = Long.parseLong(indexArray[indexArrayPosition]);
                } else {
                    inputLineGreaterThanDocument = true;
                }
                reader.skip(skipBytes);
                walkLines = lineNumber % indexLinesDistance;
            }

            for (int i = 0; i < walkLines; i++) {
                reader.readLine();
            }

            if (!inputLineGreaterThanDocument) {
                result = reader.readLine();
            }


        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            /*
            Don't need to close it here
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            */

        }

        return result;
    }
}
