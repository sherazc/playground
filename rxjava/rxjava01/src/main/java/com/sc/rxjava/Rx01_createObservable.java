package com.sc.rxjava;

import io.reactivex.rxjava3.core.Observable;

import java.util.List;
import java.util.stream.Stream;

public class Rx01_createObservable {


    public static void main(String[] args) {
        createObserverWithJust();
        createObserverFromIterable();
        createObserverUsingCreate();
    }

    private static void createObserverWithJust() {
        Observable<Integer> observable = Observable
                .just(1, 2, 3);

        observable.subscribe(System.out::println);
    }


    private static void createObserverFromIterable() {
        List<Integer> integers = List.of(1, 2, 3);

        Observable<Integer> observable = Observable.fromIterable(integers);

        observable.subscribe(System.out::println);
    }


    private static void createObserverUsingCreate() {
        Observable<Integer> observable = Observable.create(emitter -> {
            emitter.onNext(1);
            emitter.onNext(2);
            emitter.onNext(3);
        });

        observable.subscribe(System.out::println);
    }
}
