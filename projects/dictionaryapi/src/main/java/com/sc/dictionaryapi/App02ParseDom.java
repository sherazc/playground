package com.sc.dictionaryapi;

import com.sc.dictionaryapi.utils.CommonUtils;
import org.w3c.dom.Document;

public class App02ParseDom {
    public static void main(String[] args) throws Exception {
        Document responseDom = CommonUtils.accessDictionaryApiDom("test");
        System.out.println(responseDom);
    }
}
