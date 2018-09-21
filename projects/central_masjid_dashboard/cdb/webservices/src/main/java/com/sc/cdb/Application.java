package com.sc.cdb;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(scanBasePackages = "com.sc")
@RestController
public class Application {

    private static final Logger LOGGER = LoggerFactory.getLogger(Application.class);

    private final MyService myService;

    public Application(MyService myService) {
        this.myService = myService;
    }

    @GetMapping("/")
    public String home() {
        LOGGER.trace("A TRACE Message");
        LOGGER.debug("A DEBUG Message");
        LOGGER.info("An INFO Message");
        LOGGER.warn("A WARN Message");
        LOGGER.error("An ERROR Message");

        return myService.message();
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}