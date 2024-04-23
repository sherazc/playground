package com.sc.aws;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CreateBucketRequest;

public class Step01_CreateBucket {
    public static void main(String[] args) {
        String bucketName = "s3-practice02-sheraz";
        try (S3Client s3 = S3Client.builder().region(Region.US_EAST_1).build()) {

            CreateBucketRequest createRequest = CreateBucketRequest
                    .builder()
                    .bucket(bucketName)
                    .build();

            s3.createBucket(createRequest);
        }
    }
}
