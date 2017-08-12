package com.sc.s4.config.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan("com.sc")
@PropertySource("classpath:/app_config.properties")
public class AppConfig01 {
}