package com.sc.stream.eg05_reduce;

import java.util.stream.Stream;

public class App {

    public static void main(String[] args) {
        /*
        There are 2 reduction methods reduce() collect().
        reduce():
        Immutable reduction
        Don't maintain state. Creates new object on each iteration.
        Used for: TODO

        collect():
        Mutable reduction
        Maintain state. Modifying supplier on each iteration.
        Used for: TODO
         */

        System.out.println("========= reduce() =========");
        Integer total = Stream.of(2, 3, 7).reduce(0,  // Initial value
                (currentResult, streamElement) -> currentResult + streamElement);
        System.out.println(total);
    }
}
