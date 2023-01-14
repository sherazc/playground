package com.sc.rxjava;

import io.reactivex.rxjava3.core.Observable;

import java.util.UUID;
import java.util.function.Supplier;
import java.util.stream.Stream;

public class Rx03_create_emitter {

    public static void main(String[] args) {

        // Create Observable
        Observable<String> observable = Observable.create(emitter -> {
            try {
                emitter.onNext("Alpha"); // onNext() could be called infinite time.
                emitter.onNext("Beta"); // onNext() must be called in the same thread.
                emitter.onNext("Gamma");
                emitter.onComplete(); // Marks complete
            } catch (Exception e) {
                emitter.onError(e);
            }
        });

        observable
                .map(String::length)
                .filter(i -> i > 4)
                .subscribe( // Observer consumes Observable
                        System.out::println, // On Next Consumer
                        System.out::println, // On Complete Consumer
                        System.out::println  // On Error Consumer
                );

        streamAlternativesToObservableEmmitter();
    }

    private static void streamAlternativesToObservableEmmitter() {
        Stream.iterate(100, i -> ++i) // Infinite Stream
                .limit(10) // Must limit to end loop
                .forEach(System.out::println);

        // generate new on every iteration
        Supplier<String> uuidSupplier = UUID.randomUUID()::toString;
        Stream.generate(uuidSupplier)
                .limit(5)
                .forEach(System.out::println);
    }
}
