package com.sc.rxjava.rx02_operator;

import com.sc.rxjava.MyUtils;
import io.reactivex.rxjava3.core.Observable;

import java.util.concurrent.TimeUnit;

public class Rx18_take_skip_while_until {
    public static void main(String[] args) {
        Observable.range(1, 100)
                .takeWhile(i -> i < 25) // just like break and while loop
                .skipWhile(i -> i < 20) // just like continue and while loop
                .subscribe(System.out::println);



        // TODO: Do not understand takeUntil and skipUntil that takes Observable
        Observable.interval(1, TimeUnit.SECONDS)
                .map(i -> "a:" + i)
                .takeUntil(Observable.interval(1, TimeUnit.SECONDS).map(i -> "b:" + i).take(3))
                .subscribe(System.out::println);


        MyUtils.sleep(10);
    }
}
