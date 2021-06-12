package com.sc.graphql.config;

import com.sc.graphql.resolver.DepartmentResolver;
import com.sc.graphql.resolver.EmployeeResolver;
import com.sc.graphql.resolver.RootMutation;
import com.sc.graphql.resolver.RootQuery;
import graphql.kickstart.servlet.GraphQLHttpServlet;
import graphql.kickstart.tools.SchemaParser;
import graphql.schema.GraphQLSchema;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class GraphQlConfiguration {
    private final RootQuery rootQuery;
    private final RootMutation rootMutation;
    private final EmployeeResolver employeeResolver;
    private final DepartmentResolver departmentResolver;

    @Bean
    public ServletRegistrationBean<GraphQLHttpServlet> graphQlServlet() {
        return new ServletRegistrationBean<>(
                GraphQLHttpServlet.with(this.buildSchema()), "/graphql");
    }

    private GraphQLSchema buildSchema() {
        return SchemaParser
                .newParser()
                .file("graphql/schema.graphqls")
                .resolvers(rootQuery, rootMutation, departmentResolver, employeeResolver)
                .build()
                .makeExecutableSchema();
    }
}
