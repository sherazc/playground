package com.sc.rxjava;

import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.disposables.Disposable;

import java.util.concurrent.TimeUnit;

public class Rx14_disposable_consumer {
    public static void main(String[] args) {
        /*
        Disposable can be used unsubscribe

        If io.reactivex.rxjava3.functions.Consumer is used to subscribe()
        then Disposable is returned.
         */
        Disposable disposable = Observable
                .interval(1, TimeUnit.SECONDS)
                .subscribe(i -> System.out.println("Received: " + i));

        MyUtils.sleep(5);

        System.out.println("Disposing/Unsubscribing ...");
        disposable.dispose();
        System.out.println("Disposed!");

        MyUtils.sleep(5);
        System.out.println("disposable.isDisposed() = " + disposable.isDisposed());
    }
}
