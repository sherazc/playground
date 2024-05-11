package com.sc.aws;

import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

public class Step06_ReadFile_content_bytes {

    public static void main(String[] args) {
        String bucketName = "s3-practice02-sheraz";
        String FILE_NAME = "my_test_file.txt";
        try (S3Client s3 = S3Client.builder().region(Region.US_EAST_1).build()) {

            GetObjectRequest getObjectRequest = GetObjectRequest
                    .builder()
                    .bucket(bucketName)
                    .key(FILE_NAME)
                    .build();

            ResponseBytes<GetObjectResponse> objectAsBytes = s3.getObjectAsBytes(getObjectRequest);
            byte[] content = objectAsBytes.asByteArray();
            System.out.println(FILE_NAME + " content: \n" + new String(content));
        }
    }
}
