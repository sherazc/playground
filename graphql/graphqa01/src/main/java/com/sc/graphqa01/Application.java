package com.sc.graphqa01;

import com.sc.graphqa01.resolver.Query;
import com.sc.graphqa01.service.DataLoader;
import com.sc.graphqa01.service.DepartmentService;
import graphql.kickstart.servlet.GraphQLHttpServlet;
import graphql.kickstart.tools.SchemaParser;
import graphql.schema.GraphQLSchema;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@RequiredArgsConstructor
public class Application implements CommandLineRunner {

	private final DataLoader dataLoader;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		this.dataLoader.load();
	}


	private final DepartmentService departmentService;

	@Bean
	public ServletRegistrationBean<GraphQLHttpServlet> graphQlServlet() {
		return new ServletRegistrationBean<>(GraphQLHttpServlet.with(buildSchema(departmentService)), "/graphql");
	}

	private static GraphQLSchema buildSchema(DepartmentService departmentService) {
		return SchemaParser
				.newParser()
				.file("graphql/schema.graphqls")
				.resolvers(new Query(departmentService))
				.build()
				.makeExecutableSchema();
	}
}
