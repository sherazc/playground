package com.sc.controller;

import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.reactivex.rxjava3.core.Observable;

@Controller("/react")
public class ReactiveCountController {

    // TODO: Make it work

    @Get("/{count}")
    public Observable<Integer> countNumbers(@Body Integer count) {
        return Observable.range(0, count);
    }
}
