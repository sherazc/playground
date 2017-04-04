package com.sc.s4.config;

import com.sc.s4.config.config.AppConfig01Util;
import com.sc.s4.config.service.Bean02;
import org.springframework.context.ApplicationContext;

public class App01 {
    public static void main(String[] args) {
        ApplicationContext context = AppConfig01Util.loadContext();

        Bean02 bean02 = context.getBean(Bean02.class);
        System.out.println(bean02.add50(100));
    }
}
