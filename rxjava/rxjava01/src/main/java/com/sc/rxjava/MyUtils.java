package com.sc.rxjava;

import io.reactivex.rxjava3.annotations.NonNull;
import io.reactivex.rxjava3.core.Observer;
import io.reactivex.rxjava3.disposables.Disposable;

public class MyUtils {
    public static void sleep(int seconds) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


    public static Observer<Object> createObserver(String observerName) {
        return new Observer<>() {
            @Override
            public void onSubscribe(@NonNull Disposable d) {
                System.out.println(observerName + " onSubscribe() disposable = " + d);
            }

            @Override
            public void onNext(@NonNull Object object) {
                System.out.println(observerName + " onNext item = " + object);
            }

            @Override
            public void onError(@NonNull Throwable e) {
                System.out.println(observerName + " onError() e = " + e);
            }

            @Override
            public void onComplete() {
                System.out.println(observerName + " onComplete()");
            }
        };
    }
}
