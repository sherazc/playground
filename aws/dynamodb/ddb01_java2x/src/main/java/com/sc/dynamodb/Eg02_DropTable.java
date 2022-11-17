package com.sc.dynamodb;

import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.DeleteTableRequest;

// https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/examples-dynamodb-tables.html
public class Eg02_DropTable {
    public static void main(String[] args) {

        String tableName = "MyAppSingleTable";

        // Step 1 - Create client
        DynamoDbClient dynamoDbClient = LocalDbConnection.getClient();

        // Step 2 - Delete table request
        DeleteTableRequest deleteTableRequest = getDeleteTableRequest(tableName);

        // Step 3 - Delete table
        deleteTable(dynamoDbClient, deleteTableRequest);

        System.out.println("Done!");
    }

    private static void deleteTable(DynamoDbClient dynamoDbClient, DeleteTableRequest deleteTableRequest) {
        System.out.println("Deleting table...");
        dynamoDbClient.deleteTable(deleteTableRequest);
    }

    private static DeleteTableRequest getDeleteTableRequest(String tableName) {
        return DeleteTableRequest.builder()
                .tableName(tableName)
                .build();
    }
}
