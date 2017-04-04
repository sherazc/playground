package com.sc.service;

import com.sc.common.utils.FileReader;
import com.sc.common.utils.MyStringUtils;

import java.util.List;

public class SearchMainData {
    public static final String MAIN_DATA_FILE = "main_data_file.txt";

    private FileReader fileReader;

    public SearchMainData() {
        fileReader = new FileReader();
    }

    public String findByRecordNumber(int recordNumber) {
        if (recordNumber < 0) {
            return null;
        }
        String result = null;
        List<String> allLines = fileReader.realAllLines(SearchMainData.MAIN_DATA_FILE);
        if (allLines != null && allLines.size() > recordNumber) {
            result = allLines.get(recordNumber);
        }
        return result;
    }

    public boolean findByRecordNumberContains(int recordNumber, String stringInRecord) {
        String record = findByRecordNumber(recordNumber);
        return MyStringUtils.contains(record, stringInRecord);
    }

}
