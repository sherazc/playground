package com.sc.stream.eg05_reduce;

import java.util.ArrayList;
import java.util.stream.Stream;

public class App {

    public static void main(String[] args) {
        System.out.println("========= reduce() =========");
        Integer total = Stream.of(2, 3, 7).reduce(0,  // Initial value
                (currentResult, streamElement) -> currentResult + streamElement);
        System.out.println(total);
    }
}
