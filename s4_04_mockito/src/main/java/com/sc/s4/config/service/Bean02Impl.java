package com.sc.s4.config.service;

import org.springframework.stereotype.Component;

import javax.inject.Inject;

@Component
public class Bean02Impl implements Bean02 {

    @Inject
    private Bean01 bean01;

    private int extra;

    @Override
    public int add50(int input) {
        int input10 = bean01.add10(input);
        return input10 + 40 + getExtra();
    }

    public int getExtra() {
        return extra;
    }

    public void setExtra(int extra) {
        this.extra = extra;
    }
}
