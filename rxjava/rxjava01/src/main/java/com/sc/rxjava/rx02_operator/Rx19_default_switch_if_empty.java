package com.sc.rxjava.rx02_operator;

import io.reactivex.rxjava3.core.Observable;

public class Rx19_default_switch_if_empty {
    public static void main(String[] args) {
        Observable.empty()
                .defaultIfEmpty(-1)
                .subscribe(System.out::println);

        Observable.empty()
                .switchIfEmpty(Observable.range(1, 5))
                .subscribe(System.out::println);
    }
}
