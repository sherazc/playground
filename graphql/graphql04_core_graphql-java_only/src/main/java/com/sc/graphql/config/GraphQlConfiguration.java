package com.sc.graphql.config;

import java.io.IOException;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;

import graphql.GraphQL;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class GraphQlConfiguration {

    @Bean
    public GraphQL loadSchema() {
        GraphQL graphQL = null;
        try {
            Path schemaPath = new ClassPathResource("graphql/schema.graphqls").getFile().toPath();
            String schemaContent = Files.readString(schemaPath, Charset.forName("UTF-8"));
            System.out.println(schemaContent);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load schema.graphqls", e);
        }
        return graphQL;
    }


}
