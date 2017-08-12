package com.sc.dictionaryapi;

import com.sc.dictionaryapi.domain.DictionaryEntry;
import com.sc.dictionaryapi.utils.CommonUtils;

import java.util.List;

public class App04WordDefinitions {

    public static void main(String[] args) throws Exception{
        List<DictionaryEntry> dictionaryEntries = CommonUtils.findWordDefinitions("test");


        System.out.println("dictionaryEntries size = " + dictionaryEntries.size());
        for (DictionaryEntry dictionaryEntry : dictionaryEntries) {
            System.out.println(dictionaryEntry);
        }

    }

}
