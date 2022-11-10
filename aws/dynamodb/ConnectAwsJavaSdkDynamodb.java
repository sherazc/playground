package com.sc.controller;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBAsync;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBAsyncClientBuilder;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;

public class ConnectAwsJavaSdkDynamodb {

    private static final String secretKey = "fakeMyKeyId";
    private static final String accessKey = "fakeSecretAccessKey";
    private static final String endpoint = "http://localhost:8000";

    public static AmazonDynamoDB dynamoDbClient() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(secretKey, accessKey);
        AmazonDynamoDBClientBuilder clientBuilder = AmazonDynamoDBClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withEndpointConfiguration(
                        new AwsClientBuilder.EndpointConfiguration(endpoint, null)
                );
        return clientBuilder.build();
    }

    public static AmazonDynamoDBAsync dynamoDbAsyncClient() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(secretKey, accessKey);
        AmazonDynamoDBAsyncClientBuilder clientBuilder = AmazonDynamoDBAsyncClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withEndpointConfiguration(
                        new AwsClientBuilder.EndpointConfiguration(endpoint, null)
                );
        return clientBuilder.build();
    }
}
