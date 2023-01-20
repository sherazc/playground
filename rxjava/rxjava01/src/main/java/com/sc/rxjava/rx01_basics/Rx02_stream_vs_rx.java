package com.sc.rxjava.rx01_basics;

import com.sc.rxjava.MyUtils;
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

        Java Streams work on pull-base logic.
        RxJava Observable work on push-base logic.

        Java Streams start to pull items from the source on the terminal operator.

        RxJava Observable push items from the source on subscribe.
         */

        Observable.interval(1, TimeUnit.SECONDS)
                .subscribe(System.out::println);

        MyUtils.sleep(10);
    }
}
