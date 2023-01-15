package com.sc.rxjava;

import io.reactivex.rxjava3.core.Observable;

public class Rx05_multiple_subscriber {

    public static void main(String[] args) {
        Observable<Integer> observable = Observable.just(1, 2, 3);
        /*
        Observable could have multiple subscribers/observers
         */
        observable.subscribe(i -> System.out.println("Subscriber a = i = " + i));
        observable.subscribe(i -> System.out.println("Subscriber b = i = " + i));
    }
}
