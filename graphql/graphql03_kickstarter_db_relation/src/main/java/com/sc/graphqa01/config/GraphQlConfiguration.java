package com.sc.graphqa01.config;

import com.sc.graphqa01.resolver.RootQuery;
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

    @Bean
    public ServletRegistrationBean<GraphQLHttpServlet> graphQlServlet() {
        return new ServletRegistrationBean<>(
                GraphQLHttpServlet.with(this.buildSchema()), "/graphql");
    }

    private GraphQLSchema buildSchema() {
        return SchemaParser
                .newParser()
                .file("graphql/schema.graphqls")
                .resolvers(rootQuery)
                .build()
                .makeExecutableSchema();
    }
}
