package com.sc.rp.app.fulfilment.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan("com.sc.rp.app.fulfilment")
@PropertySource("classpath:fulfilment-context.properties")
@EnableAutoConfiguration
public class FulfilmentContextConfiguration {
}
