package com.sc.service;

import io.micronaut.context.annotation.Bean;

@Bean
public class GreetingService {
    public String getGreeting() {
        return "Hello ";
    }
}
