package com.sc.rp.app.config;


import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan("com.sc.rp.app")
@PropertySource("classpath:application.properties")
@EnableAutoConfiguration
public class ApplicationContextConfiguration {
}
