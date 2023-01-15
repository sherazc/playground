package com.sc.rxjava;

import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.observables.ConnectableObservable;

import java.util.concurrent.TimeUnit;

public class Rx06_hot_observable_ConnectableObservable {

    public static void main(String[] args) {

        /*
        publish() method converts any Observable to ConnectableObservable<T>
        ConnectableObservable<T> is one of the hot Observable types.
         */

        ConnectableObservable<Long> observable = Observable.interval(1, TimeUnit.SECONDS)
                .publish();

        /*
        Once connect() is called ConnectableObservable<T> will start
        pushing items to Observer
         */
        observable.connect();

        // Notice the first item received by Subscriber a is 0
        observable.subscribe(i -> System.out.println("Subscriber a = i = " + i));

        MyUtils.sleep(5);
        // Notice the first item received by Subscriber b is 5
        observable.subscribe(i -> System.out.println("Subscriber b = i = " + i));

        MyUtils.sleep(5);

        // Notice the first item received by Subscriber c is 10
        observable.subscribe(i -> System.out.println("Subscriber c = i = " + i));

        // Waiting so the main thread will not finish.
        MyUtils.sleep(120);
    }
}
