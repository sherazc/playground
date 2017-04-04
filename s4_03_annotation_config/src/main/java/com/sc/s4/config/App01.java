package com.sc.s4.config;

import com.sc.s4.config.config.AppConfig01Util;
import com.sc.s4.config.service.Bean01;
import com.sc.s4.config.service.Bean02;
import com.sc.s4.config.service.Bean03;
import com.sc.s4.config.service.Bean04;
import org.springframework.context.ApplicationContext;

public class App01 {
    public static void main(String[] args) {
        ApplicationContext context = AppConfig01Util.loadContext();

        System.out.println("========================01");
        Bean01 bean01 = context.getBean(Bean01.class);
        bean01.bean01Method();

        System.out.println("========================02");
        Bean02 bean02 = context.getBean(Bean02.class);
        bean02.bean02Method();

        System.out.println("========================03");
        Bean03 bean03 = context.getBean(Bean03.class);
        bean03.bean03Method();

        System.out.println("========================04");
        Bean04 bean04 = (Bean04) context.getBean("Bean04");
        bean04.bean04Method();

        System.out.println("========================");
    }
}
