package com.sc.aws;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectResponse;

public class Step09_DeleteFile {

    public static void main(String[] args) {
        String FILE_NAME = "my_test_file.txt";
        String bucketName = "s3-practice02-sheraz";

        try (S3Client s3 = S3Client.builder().region(Region.US_EAST_1).build()) {

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest
                    .builder()
                    .bucket(bucketName)
                    .key(FILE_NAME)
                    .build();

            // TODO: Look into how to get delete status.
            //  Search online could not find a good solution
            DeleteObjectResponse deleteObjectResponse = s3.deleteObject(deleteObjectRequest);

            System.out.println("Delete file http status code: "+ deleteObjectResponse.sdkHttpResponse().statusCode());

            System.out.println("Deleted file: " + FILE_NAME);
        }

    }
}
