package com.sc.s4.config.config;

import com.sc.s4.config.service.Bean01;
import com.sc.s4.config.service.Bean03;
import org.springframework.context.annotation.*;

@Configuration
@ComponentScan("com.sc")
@PropertySource("classpath:/app_config.properties")
@ImportResource("classpath:/app_config.properties")
public class AppConfig01 {

    @Bean
    public Bean01 buildBean01() {
        return new Bean01();
    }

    @Bean
    public Bean03 buildBean03() {
        return new Bean03("Config Message");
    }
}