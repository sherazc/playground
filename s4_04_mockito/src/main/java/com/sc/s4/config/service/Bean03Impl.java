package com.sc.s4.config.service;

import org.springframework.stereotype.Component;

import javax.inject.Inject;

@Component
public class Bean03Impl implements Bean03 {

    @Inject
    private Bean02 bean02;

    private int extra;

    @Override
    public int add40(int input) {
        int input50 = bean02.add50(input);
        return input50 - 10 + getExtra();
    }

    public int getExtra() {
        return extra;
    }

    public void setExtra(int extra) {
        this.extra = extra;
    }
}
