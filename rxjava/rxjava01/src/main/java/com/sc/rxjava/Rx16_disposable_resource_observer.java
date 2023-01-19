package com.sc.rxjava;

import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.disposables.Disposable;
import io.reactivex.rxjava3.observers.ResourceObserver;

import java.util.concurrent.TimeUnit;

public class Rx16_disposable_resource_observer {
    public static void main(String[] args) {
        // Disposable subscribeWith(ResourceObserver)
        Disposable disposable = Observable
                .interval(1, TimeUnit.SECONDS)
                .subscribeWith(createObserver());

        MyUtils.sleep(5);

        System.out.println("Disposing/Unsubscribing ...");
        disposable.dispose();
        System.out.println("Disposed!");

        MyUtils.sleep(5);
        System.out.println("disposable.isDisposed() = " + disposable.isDisposed());
    }


    public static ResourceObserver<Long> createObserver() {
        return new ResourceObserver<>() {
            public void onNext(Long number) {
                System.out.println("onNext item = " + number);
            }

            public void onError(Throwable e) {
                System.out.println("onError() e = " + e);
            }

            public void onComplete() {
                System.out.println("onComplete()");
            }
        };
    }
}
