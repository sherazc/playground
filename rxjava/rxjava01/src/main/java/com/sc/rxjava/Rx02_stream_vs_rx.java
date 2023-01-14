package com.sc.rxjava;

import io.reactivex.rxjava3.core.Observable;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

public class Rx02_stream_vs_rx {


    public static void main(String[] args) {
        /*

        Similarities:
        To draw comparison between RxJava and Java Streams

         */
        Stream.of("a", "b", "c")                // Observable
                .filter(                                // Operator
                        "a"::equals                     // Observer
                )
                .forEach(                               // Operator
                        System.out::println             // Observer
                );


        /*
        Differences:

        Java Streams work on pull items
        RxJava Observable work on push items

        Java Streams has static data
        RxJava Observable items could generate infinitely
         */


        Observable.interval(1, TimeUnit.SECONDS)
                .subscribe(System.out::println);

        MyUtils.sleep(10);

    }
}
