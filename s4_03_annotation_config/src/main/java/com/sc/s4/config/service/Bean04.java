package com.sc.s4.config.service;

import org.springframework.stereotype.Component;

import javax.inject.Inject;

@Component("Bean04")
public class Bean04 {

    @Inject
    private Bean02 bean02;

    public String bean04Method() {
        String message = "----- Bean04 Message Start -----\n";
        message += bean02.bean02Method();
        message += "\n----- Bean04 Message end -----";
        System.out.println(message);
        return message;
    }
}
