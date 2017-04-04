package com.sc.dictionaryapi;

import com.sc.dictionaryapi.utils.CommonUtils;

public class App01AccessDictionaryApi {

    public static void main(String[] args) {
        String responseString = CommonUtils.accessDictionaryApiString("boy");
        System.out.println(responseString);
    }
}
