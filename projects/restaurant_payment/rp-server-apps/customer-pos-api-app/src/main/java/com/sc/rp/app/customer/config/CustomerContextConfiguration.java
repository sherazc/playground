package com.sc.rp.app.customer.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan("com.sc.rp.app.customer")
@PropertySource("classpath:customer-context.properties")
@EnableAutoConfiguration
public class CustomerContextConfiguration {
}
