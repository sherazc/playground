package com.sc.s4.config.service;

import org.springframework.stereotype.Component;

@Component
public class Bean01Impl implements Bean01 {

    public int add10(int input) {
        return input + 10;
    }
}
