package com.sc.rxjava.rx02_operator;

import io.reactivex.rxjava3.core.Observable;

import java.util.concurrent.TimeUnit;

public class Rx20_take {
    public static void main(String[] args) {
        Observable.range(200, 205)
                .take(3, TimeUnit.SECONDS) // limits number of emits
                .subscribe(System.out::println);

        Observable.interval(1, TimeUnit.SECONDS)
                .take(3, TimeUnit.SECONDS) // it will accept emits for 3 seconds
                .subscribe(System.out::println);

    }
}
