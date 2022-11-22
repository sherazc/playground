package com.sc.dynamodb;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.PutItemResponse;

import java.util.Map;

// https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/examples-dynamodb-items.html
public class Eg04_GetItem {
    public static void main(String[] args) {

        String tableName = "MyAppSingleTable";
        String primaryKeyName = "primary_key";
        String sortKeyName = "sort_key";

        // Step 1 - Create client
        DynamoDbClient dynamoDbClient = LocalDbConnection.getClient();

        // Step 2 - Get Item request
        GetItemRequest getItemRequest = getGetItemRequest(tableName, primaryKeyName, sortKeyName);

        // Step 3 - Get Item
        getItem(dynamoDbClient, getItemRequest);
    }

    public static void getItem(DynamoDbClient dynamoDbClient, GetItemRequest getItemRequest) {
        System.out.println("Getting items...");
        GetItemResponse getItemResponse = dynamoDbClient.getItem(getItemRequest);
        System.out.printf("records found = %b\n", getItemResponse.hasItem());
        Map<String, AttributeValue> attributeValueMap = getItemResponse.item();

        attributeValueMap.forEach((name, value) -> {
            System.out.printf("%s=%s\n", name, value.s());
        });
    }

    private static GetItemRequest getGetItemRequest(String tableName, String primaryKeyName, String sortKeyName) {
        System.out.println("Creating GetItemRequest...");

        Map<String, AttributeValue> keyToGet = Map.of(
                primaryKeyName, AttributeValue.builder().s("pk_1668693849032").build(),
                sortKeyName, AttributeValue.builder().s("sk_1668693849032").build()
        );

        return GetItemRequest.builder()
                .key(keyToGet)
                .tableName(tableName)
                .build();
    }
}
