package com.sc.gradle;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

public class MyServiceA {

    public String sumStringNums(String numA, String numB) {
        if (!StringUtils.isNumeric(numA) || !StringUtils.isNumeric(numB)) {
            return "Bad input. numA=" + numA + " numB=" + numB;
        }
        return "numA + numB = " + (NumberUtils.toInt(numA) + NumberUtils.toInt(numB));
    }
}