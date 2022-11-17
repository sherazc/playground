package com.sc.dynamodb;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import java.net.URI;

public class LocalDbConnection {
    public static DynamoDbClient getClient() {

        System.out.println("Creating DynamoDbClient...");

        // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/CodeSamples.Java.html
        return DynamoDbClient.builder()
                .region(Region.US_EAST_1)
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create("dummy-key", "dummy-secret")))
                .endpointOverride(URI.create("http://localhost:8000"))
                .build();
    }
}
