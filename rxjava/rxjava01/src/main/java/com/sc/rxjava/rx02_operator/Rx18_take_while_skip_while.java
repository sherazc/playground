package com.sc.rxjava.rx02_operator;

import io.reactivex.rxjava3.core.Observable;

public class Rx18_take_while_skip_while {
    public static void main(String[] args) {
        Observable.range(1, 100)
                .takeWhile(i -> i < 25) // just like break
                .skipWhile(i -> i < 20) // just like continue
                .subscribe(System.out::println);
    }
}
