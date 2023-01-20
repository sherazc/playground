package com.sc.rxjava.rx01_basics;

import io.reactivex.rxjava3.core.Observable;

public class Rx09_defer {
    static int start = 10;
    static int count = 3;

    public static void main(String[] args) {
        // On every subscription defer()'s supplier will be called.
        // Which means for every Observer a new Observable will be created.
        Observable<Integer> deferObservable = Observable.defer(() -> Observable.range(start, count));

        // 10, 11, 12
        deferObservable.subscribe(System.out::println);

        start = 20;
        count = 2;

        // Because of this second Observer will have different range.
        // Because range limits are changed.
        // 20, 21
        deferObservable.subscribe(System.out::println);
    }
}
