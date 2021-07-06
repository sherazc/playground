package com.sc.spring.schedule.app07_schedule;

import java.util.Date;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Scheduled(fixedRate = 2000)
	void someJob() {
		System.out.println(Thread.currentThread().getName() + " - Date: " + new Date());
	}
}


@Configuration
@EnableScheduling
class ScheduleConfiguration {
}
