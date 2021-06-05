package com.sc.graphql.config;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import com.sc.graphql.fetcher.RootQueryFetcher;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import graphql.schema.idl.TypeRuntimeWiring;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class GraphQlConfiguration {

    private final RootQueryFetcher rootQueryFetcher;

    @Bean
    public GraphQL graphQl() {
        String schemaContent = loadSchemaContent();
        TypeDefinitionRegistry typeRegistry = new SchemaParser().parse(schemaContent);
        RuntimeWiring runtimeWiring = buildWiring();
        SchemaGenerator schemaGenerator = new SchemaGenerator();
        GraphQLSchema graphQLSchema = schemaGenerator.makeExecutableSchema(typeRegistry, runtimeWiring);
        return GraphQL.newGraphQL(graphQLSchema).build();
    }

    private String loadSchemaContent() {
        String result;
        try {
            Path schemaPath = new ClassPathResource("graphql/schema.graphqls").getFile().toPath();
            result = Files.readString(schemaPath, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load schema.graphqls", e);
        }
        return result;
    }

    private RuntimeWiring buildWiring() {
        TypeRuntimeWiring.Builder rootQueryWiringBuilder = TypeRuntimeWiring.newTypeWiring("RootQuery")
                .dataFetcher("getMyName", rootQueryFetcher.getMyName())
                .dataFetcher("getRandomNumbers", rootQueryFetcher.getRandomNumbers());

        return RuntimeWiring.newRuntimeWiring()
                .type(rootQueryWiringBuilder)
                .build();
    }

}
