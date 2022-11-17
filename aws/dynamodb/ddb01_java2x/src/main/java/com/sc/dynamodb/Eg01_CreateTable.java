package com.sc.dynamodb;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeDefinition;
import software.amazon.awssdk.services.dynamodb.model.CreateTableRequest;
import software.amazon.awssdk.services.dynamodb.model.CreateTableResponse;
import software.amazon.awssdk.services.dynamodb.model.DynamoDbException;
import software.amazon.awssdk.services.dynamodb.model.KeySchemaElement;
import software.amazon.awssdk.services.dynamodb.model.KeyType;
import software.amazon.awssdk.services.dynamodb.model.ProvisionedThroughput;
import software.amazon.awssdk.services.dynamodb.model.ScalarAttributeType;

// https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/examples-dynamodb-tables.html
public class Eg01_CreateTable {
    public static void main(String[] args) {

        String tableName = "MyAppSingleTable";
        String primaryKey = "primary_key"; // AKA Partition Key. If single primary key then HASH key
        String sortKey = "sort_key"; // Sort Key. RANGE key

        // Step 1 - Create client
        DynamoDbClient dynamoDbClient = LocalDbConnection.getClient();

        // Step 2 - Create table request
        CreateTableRequest createTableRequest = getCreateTableRequest(tableName, primaryKey, sortKey);

        // Step 3 - Create table
        createTable(dynamoDbClient, createTableRequest);

        System.out.println("Done!");
    }

    private static void createTable(DynamoDbClient dynamoDbClient, CreateTableRequest createTableRequest) {
        System.out.println("Creating table...");
        try {
            CreateTableResponse createTableResponse = dynamoDbClient.createTable(createTableRequest);
            String tableId = createTableResponse.tableDescription().tableId();
            System.out.printf("Table created %s%n", tableId);
        } catch (DynamoDbException e) {
            e.printStackTrace();
        }
    }

    private static CreateTableRequest getCreateTableRequest(String tableName, String primaryKey, String sortKey) {
        System.out.println("Creating CreateTableRequest...");
        CreateTableRequest createTableRequest = CreateTableRequest.builder()
                // All Columns Definition
                .attributeDefinitions(
                        AttributeDefinition.builder()
                                .attributeName(primaryKey) // Primary Key Column Definition
                                .attributeType(ScalarAttributeType.S) // S=String, N=Numeric, B=Binary
                                .build()
//                        ,
//                        AttributeDefinition.builder()
//                                .attributeName(sortKey) // Sort Key Column Definition
//                                .attributeType(ScalarAttributeType.S)
//                                .build(),
//                        AttributeDefinition.builder()
//                                .attributeName("value_column") // Other value column
//                                .attributeType(ScalarAttributeType.S)
//                                .build()
                )
                // Make key column as Primary key and sort key
                // Primary key is mandatory, Sort Key is optional
                // HASH=Single PrimaryKey column. RANGE=PrimaryKey+SortKey
                .keySchema(
                        KeySchemaElement.builder()
                                .attributeName(primaryKey) // Which attribute/column from attributeDefinitions is primary key
                                .keyType(KeyType.HASH)
                                .build()
//                        ,
//                        KeySchemaElement.builder()
//                                .attributeName(sortKey) // Which attribute/column from attributeDefinitions is sort key
//                                .keyType(KeyType.RANGE)
//                                .build()
                )
                // Read & Write capacity Units
                // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html
                .provisionedThroughput(
                        ProvisionedThroughput.builder()
                                .readCapacityUnits(10L)
                                .writeCapacityUnits(10L)
                                .build()
                )
                .tableName(tableName)
                .build();
        return createTableRequest;
    }
}
