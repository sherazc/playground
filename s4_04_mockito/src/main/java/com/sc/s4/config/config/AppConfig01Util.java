package com.sc.s4.config.config;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class AppConfig01Util {
    public static ApplicationContext loadContext() {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext();
        context.register(AppConfig01.class);
        context.refresh();
        return context;
    }
}
