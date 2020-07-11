package com.sc.rp.app.main.config;


import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan("com.sc.rp.app.main")
@PropertySource("classpath:application.properties")
@EnableAutoConfiguration
public class ApplicationContextConfiguration {
}
