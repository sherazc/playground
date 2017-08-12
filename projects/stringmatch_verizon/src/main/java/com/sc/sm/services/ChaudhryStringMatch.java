package com.sc.sm.services;

import java.util.*;

/**
 * Created by sheraz on 4/17/16.
 */
public class ChaudhryStringMatch implements StringMatch {

    private String x;
    private String y;

    private int n1;
    private int n2;

    public ChaudhryStringMatch(String x, String y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public String getX() {
        return x;
    }

    @Override
    public String getY() {
        return y;
    }

    @Override
    public int getN1() {
        return n1;
    }

    @Override
    public int getN2() {
        return n2;
    }

    @Override
    public StringMatch calculate() {
        if (x == null || y == null) {
            return this;
        }
        char[] charsX = x.toCharArray();
        char[] charsY = y.toCharArray();

        Set<Character> alreadyMatchedX = new HashSet<>();
        Set<Character> alreadyMatchedY = new HashSet<>();

        for (int i = 0; i < charsX.length; i++) {
            if (i >= charsY.length) {
                break;
            }
            if (!alreadyMatchedX.contains(charsX[i]) && charsX[i] == charsY[i]) {
                n1++;
                alreadyMatchedX.add(charsX[i]);
            }
            if (!alreadyMatchedY.contains(charsX[i]) && charExistsInDifferentIndex(i, charsX[i], charsY)) {
                n2++;
                alreadyMatchedY.add(charsX[i]);
            }
        }
        return this;
    }

    private boolean charExistsInDifferentIndex(int index, char c, char[] chars) {
        boolean found = false;
        for (int i = 0; i < chars.length; i++) {
            if (i == index) {
                continue;
            } else if (found = c == chars[i]) {
                break;
            }
        }
        return found;
    }

    // Do not modify
    @Override
    public String toString() {
        return String.format("f(\"%s\", \"%s\"): %d, %d", getX(), getY(), getN1(),
                getN2());
    }
}
