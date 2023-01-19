package com.sc.rxjava;

import io.reactivex.rxjava3.annotations.NonNull;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Observer;
import io.reactivex.rxjava3.disposables.Disposable;

public class Rx15_disposable_observer {
    public static void main(String[] args) {

        // void subscribe(Observer)
        // subscribe(Observer) do not return anything
        // Disposable is passed in Observer<T>.onSubscribe(Disposable)
        Observable.range(0, 10)
                .subscribe(createObserver());
    }

    public static Observer<Integer> createObserver() {
        return new Observer<>() {
            private Disposable disposable;

            public void onSubscribe(Disposable disposable) {
                // onSubscribe receives reference to Disposable
                this.disposable = disposable;
                System.out.println("onSubscribe() disposable = " + disposable);
            }

            public void onNext(Integer integer) {
                // All Observer method have reference
                if (integer > 5) {
                    this.disposable.dispose();
                }
                System.out.println("onNext item = " + integer);
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
