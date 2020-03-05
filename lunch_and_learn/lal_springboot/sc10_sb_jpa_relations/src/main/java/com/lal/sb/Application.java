package com.lal.sb;

import com.lal.sb.services.DataLoader;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
