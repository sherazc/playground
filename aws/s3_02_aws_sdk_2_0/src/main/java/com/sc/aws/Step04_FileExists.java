package com.sc.aws;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

public class Step04_FileExists {

    public static void main(String[] args) {
        String FILE_NAME = "my_test_file2.txt";
        String bucketName = "s3-practice02-sheraz";
        try (S3Client s3 = S3Client.builder().region(Region.US_EAST_1).build()) {

            HeadObjectRequest headObjectRequest = HeadObjectRequest
                    .builder()
                    .bucket(bucketName)
                    .key(FILE_NAME)
                    .build();
            try {
                HeadObjectResponse headObjectResponse = s3.headObject(headObjectRequest);
                System.out.println("File exists " + FILE_NAME + ". Bytes size " + headObjectResponse.contentLength());
            } catch (NoSuchKeyException e) {
                System.out.println("File do not exists " + FILE_NAME);
            }
        }
    }
}
