package com.sc.rp.app;

import com.sc.rp.app.config.ApplicationContextConfiguration;
import com.sc.rp.app.customer.config.CustomerContextConfiguration;
import com.sc.rp.app.fulfilment.config.FulfilmentContextConfiguration;
import com.sc.rp.app.system.config.SystemContextConfiguration;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		// SpringApplication.run(Application.class, args);
		new SpringApplicationBuilder()
				.parent(ApplicationContextConfiguration.class).web(WebApplicationType.NONE)
				.child(SystemContextConfiguration.class).web(WebApplicationType.SERVLET)
				// .sibling(FulfilmentContextConfiguration.class).web(WebApplicationType.SERVLET)
				// .sibling(CustomerContextConfiguration.class).web(WebApplicationType.SERVLET)
				.run(args);
	}
}
