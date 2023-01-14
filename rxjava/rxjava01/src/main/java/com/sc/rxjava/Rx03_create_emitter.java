package com.sc.rxjava;

import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.functions.Action;
import io.reactivex.rxjava3.functions.Consumer;

import java.util.UUID;
import java.util.function.Supplier;
import java.util.stream.Stream;

public class Rx03_create_emitter {

    public static void main(String[] args) {

        // Observable produces values
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

        Consumer<Integer> onNextConsumer = System.out::println;
        Consumer<Throwable> onCompleteConsumer = System.out::println;
        Action onErrorAction = System.out::println;

        observable
                .map(String::length) // values go through pipeline
                .filter(i -> i > 4)
                // Values get consumed by subscriber/observer.
                .subscribe(onNextConsumer, onCompleteConsumer, onErrorAction);

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
