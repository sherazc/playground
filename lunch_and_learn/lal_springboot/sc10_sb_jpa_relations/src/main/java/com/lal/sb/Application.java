package com.lal.sb;

import com.lal.sb.services.DataLoader;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Query Joins
// https://www.roytuts.com/spring-boot-data-jpa-left-right-inner-and-cross-join-examples/

// Long query tutorial
// https://www.petrikainulainen.net/programming/spring-framework/spring-data-jpa-tutorial-three-custom-queries-with-query-methods/

// Query Methods
// https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods

// Criteria Specification
// https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#specifications

@SpringBootApplication
public class Application implements CommandLineRunner {

	private DataLoader dataLoader;

	public Application(DataLoader dataLoader) {
		this.dataLoader = dataLoader;
	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		dataLoader.loadDefaultData();
	}
}
