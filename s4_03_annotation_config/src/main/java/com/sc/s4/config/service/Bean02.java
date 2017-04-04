package com.sc.s4.config.service;

import org.springframework.stereotype.Component;

@Component
public class Bean02 {
    public String bean02Method() {
        String message = "Bean02 Service message";
        System.out.println(message);
        return message;
    }
}
