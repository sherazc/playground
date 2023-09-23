package com.sc.java10.project01;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Eg03_Immutable_Collections {
    public static void main(String[] args) {
        List<Integer> integers = new ArrayList<>();
        integers.add(1);
        List<Integer> integersUnmodifiable = Collections.unmodifiableList(integers);
//        integersUnmodifiable.add(2); // Error

//        More unmodifiable collections methods
//        Collections.unmodifiableMap()
//        Collections.unmodifiableSet()
//        Collections.unmodifiableCollection()
    }
}
