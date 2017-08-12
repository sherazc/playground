package com.sc.s4.app;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class ConsumeEmployeesRest implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(ConsumeEmployeesRest.class, args);
    }

    @Override
    public void run(String... strings) throws Exception {
        System.out.println("OK");
        // http://localhost:8080/rest/employees

        RestTemplate restTemplate = new RestTemplate();

    }
}
