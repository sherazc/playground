package com.sc.rxjava;

import io.reactivex.rxjava3.core.Observable;

public class Rx07_other_observables {

    public static void main(String[] args) {

        // Range of Integer observable
        Observable.range(5, 3)
                .subscribe(MyUtils.createObserver("Range"));

        // Only onSubscribed and onComplete is called
        Observable.empty()
                .subscribe(MyUtils.createObserver("Empty"));

        // Only onSubscribed is called
        Observable.never()
                .subscribe(MyUtils.createObserver("Never"));

        // Only onSubscribed and onError is called
        Observable.error(new Exception("Something bad happened"))
                .subscribe(MyUtils.createObserver("Error"));
    }
}
