package com.sc.rxjava.rx01_basics;


import io.reactivex.rxjava3.core.Maybe;
import io.reactivex.rxjava3.core.MaybeObserver;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.disposables.Disposable;

public class Rx12_maybe {
    public static void main(String[] args) {
        // Maybe<T> emits one or zero values
        // Just like Optional<T>
        Maybe.just(1)
                .subscribe(createObserver());

        Maybe.empty()
                .subscribe(createObserver());

        Maybe<Integer> maybe = Observable.just(1, 2)
                .filter(i -> i > 2)
                // Any Observable can be converted to Maybe by calling firstElement()
                .firstElement();

        maybe.subscribe(createObserver());
    }

    // Maybe Observable has its own MaybeObserver
    private static MaybeObserver<Object> createObserver() {
        return new MaybeObserver<>() {
            public void onSubscribe(Disposable disposable) {
                System.out.println("onSubscribe() disposable = " + disposable);
            }

            public void onSuccess(Object item) {
                System.out.println("onSuccess() item = " + item);
            }

            public void onError(Throwable throwable) {
                System.out.println("onError() throwable = " + throwable);
            }

            public void onComplete() {
                System.out.println("onComplete()");
            }
        };
    }
}
