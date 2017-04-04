package com.sc.s4.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.sc"})
public class SimpleBootCxfApplication {
    public static void main(String[] args) {
        SpringApplication.run(SimpleBootCxfApplication.class, args);
    }
}
