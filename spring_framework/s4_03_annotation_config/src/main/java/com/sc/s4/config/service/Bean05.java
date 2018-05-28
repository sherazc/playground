package com.sc.s4.config.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.inject.Inject;

@Component("Bean05")
public class Bean05 {

    @Inject
    private Environment environment;

    @Value("${prop02}")
    private String prop;

    public String bean05Method() {
        String message = "Environment variable JAVA_HOME: " + environment.getProperty("JAVA_HOME");
        message += "\nproperty value prop01: " + environment.getProperty("prop01");
        message += "\nproperty value prop02: " + prop;
        System.out.println(message);
        return message;
    }
}
