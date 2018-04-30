package com.sc.java9.eg03_underscore_keyword;

public class App {
    public static void main(String[] args) {
        // Can not create variable with just underscore
        // String _ = "String 1";
        /*
        In java 9 it gives this compilation error:
        as of release 9, '_' is a keyword, and may not be used as an identifier

        In java 8 it gives this warning message:
        '_' used as an identifier
        (use of '_' as an identifier might not be supported in releases after Java SE 8)
         */

        // 2 or more underscore or any other variation is OK
        String __ = "String 2";
        String _a = "String 3";
        String a_ = "String 4";
    }
}
