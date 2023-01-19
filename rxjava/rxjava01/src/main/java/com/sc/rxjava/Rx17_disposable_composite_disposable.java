package com.sc.rxjava;

import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.disposables.CompositeDisposable;
import io.reactivex.rxjava3.disposables.Disposable;

import java.util.concurrent.TimeUnit;

public class Rx17_disposable_composite_disposable {
    public static void main(String[] args) {

        CompositeDisposable compositeDisposable = new CompositeDisposable();

        Observable<Long> observable = Observable.interval(1, TimeUnit.SECONDS);

        Disposable disposable1 = observable
                .subscribe(i -> System.out.println("A Received: " + i));

        Disposable disposable2 = observable
                .subscribe(i -> System.out.println("B Received: " + i));

        // Combines multiple Disposable
        compositeDisposable.addAll(disposable1, disposable2);

        MyUtils.sleep(5);

        System.out.println("Disposing all Disposable ...");
        // All disposable will be disposed
        compositeDisposable.dispose();
        System.out.println("Disposed!");

        MyUtils.sleep(5);

        // Check status of all Disposable
        System.out.println("compositeDisposable.isDisposed() = "
                + compositeDisposable.isDisposed());
        System.out.println("disposable1.isDisposed() = "
                + disposable1.isDisposed());
        System.out.println("disposable2.isDisposed() = "
                + disposable2.isDisposed());
    }
}
