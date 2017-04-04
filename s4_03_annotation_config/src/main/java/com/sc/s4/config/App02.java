package com.sc.s4.config;

import com.sc.s4.config.config.AppConfig01Util;
import com.sc.s4.config.service.Bean05;
import org.springframework.context.ApplicationContext;

/**
 * Created by sheraz on 3/10/16.
 */
public class App02 {
    public static void main(String[] args) {

        ApplicationContext context = AppConfig01Util.loadContext();

        Bean05 bean05 = context.getBean(Bean05.class);
        bean05.bean05Method();
    }
}
