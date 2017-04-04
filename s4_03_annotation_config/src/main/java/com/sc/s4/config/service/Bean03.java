package com.sc.s4.config.service;

public class Bean03 {

    private String customMessage;

    public Bean03(String customMessage) {
        this.customMessage = customMessage;
    }

    public String bean03Method() {
        String message = "Bean03 Service message: Custom message: " + customMessage;
        System.out.println(message);
        return message;
    }
}
