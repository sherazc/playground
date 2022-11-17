package com.sc.dynamodb;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemResponse;

import java.util.Map;

// https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/examples-dynamodb-items.html
public class Eg03_PutItem {
    public static void main(String[] args) {

        String tableName = "MyAppSingleTable";
        String primaryKeyName = "primary_key";
        String sortKeyName = "sort_key";

        // Step 1 - Create client
        DynamoDbClient dynamoDbClient = LocalDbConnection.getClient();

        // Step 2 - Put Item request
        PutItemRequest putItemRequest = getPutItemRequest(tableName, primaryKeyName, sortKeyName);

        // Step 3 - Put Item
        putItem(dynamoDbClient, putItemRequest);

        System.out.println("Done!");
    }

    public static void putItem(DynamoDbClient dynamoDbClient, PutItemRequest putItemRequest) {
        System.out.println("Putting item...");
        PutItemResponse putItemResponse = dynamoDbClient.putItem(putItemRequest);
        System.out.println("Done! " + putItemResponse.toString());
    }

    private static PutItemRequest getPutItemRequest(String tableName, String primaryKeyName, String sortKeyName) {
        System.out.println("Creating PutItemRequest...");
        long millis = System.currentTimeMillis();

        Map<String, AttributeValue> itemValues = Map.of(
                primaryKeyName,         AttributeValue.builder().s("pk_" + millis).build(),
                sortKeyName,            AttributeValue.builder().s("sk_" + millis).build(),
                "attribute_1",      AttributeValue.builder().s("att_1_" + millis).build(),
                "attribute_2",      AttributeValue.builder().s("att_2_" + millis).build()
        );

        return PutItemRequest.builder()
                .tableName(tableName)
                .item(itemValues)
                .build();
    }


}
