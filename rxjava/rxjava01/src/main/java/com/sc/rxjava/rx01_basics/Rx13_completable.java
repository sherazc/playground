package com.sc.rxjava.rx01_basics;

import io.reactivex.rxjava3.core.Completable;
import io.reactivex.rxjava3.core.CompletableObserver;
import io.reactivex.rxjava3.disposables.Disposable;

public class Rx13_completable {
    public static void main(String[] args) {
        // Completable<T> emits no values
        // Used when need to observer if a task is complete
        Completable.fromRunnable(() -> System.out.println("Running Task"))
                .subscribe(createObserver());
    }

    // Completable Observable has its own CompletableObserver
    private static CompletableObserver createObserver() {
        return new CompletableObserver() {
            public void onSubscribe(Disposable disposable) {
                System.out.println("onSubscribe() disposable = " + disposable);
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
