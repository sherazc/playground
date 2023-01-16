package com.sc.rxjava;


import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Single;
import io.reactivex.rxjava3.core.SingleObserver;
import io.reactivex.rxjava3.disposables.Disposable;

public class Rx11_single {
    public static void main(String[] args) {
        // Single emits only one value
        Single.just(1)
                .subscribe(createObserver());

        Single<Integer> singleObserver = Observable.just(1, 2, 3)
                .skip(1)
                // Any Observable can be converted to Single by calling first()
                .first(-1);// Takes Default

        singleObserver.subscribe(createObserver());

    }

    // Single Observable has its own SingleObserver
    private static SingleObserver<Integer> createObserver() {
        return new SingleObserver<>() {
            public void onSubscribe(Disposable disposable) {
                System.out.println("onSubscribe() disposable = " + disposable);
            }

            public void onSuccess(Integer integer) {
                System.out.println("onSuccess() item = " + integer);
            }

            public void onError(Throwable throwable) {
                System.out.println("onError() throwable = " + throwable);
            }
        };
    }
}
