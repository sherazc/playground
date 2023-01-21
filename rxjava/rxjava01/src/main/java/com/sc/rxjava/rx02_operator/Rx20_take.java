package com.sc.rxjava.rx02_operator;

import com.sc.rxjava.MyUtils;
import io.reactivex.rxjava3.core.Observable;

import java.util.concurrent.TimeUnit;

public class Rx20_take {
    public static void main(String[] args) {
        Observable.interval(1, TimeUnit.SECONDS)
                .take(3, TimeUnit.SECONDS) // it will accept emits for 3 seconds
                .subscribe(System.out::println);

        Observable.range(300, 5)
                .takeLast(2) // Only take last 2 emits
                .subscribe(System.out::println);


        MyUtils.sleep(10);
    }
}
