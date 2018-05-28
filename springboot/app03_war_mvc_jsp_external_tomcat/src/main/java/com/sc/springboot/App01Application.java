package com.sc.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class App01Application extends SpringBootServletInitializer {
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(App01Application.class);
	}

	// main() is not needed to run in external web container.
	// Left it here spring-boot-maven-plugin complains on:
	// $ mvn clean install
	public static void main(String[] args) {
		SpringApplication.run(App01Application.class, args);
	}
}
