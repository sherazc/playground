package com.sc.aws;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

public class Step1_CreateBucket {
    public static void main(String[] args) {
        AmazonS3 s3 = AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_1)
                .build();

        String bucketName = "s3-practice01";
        s3.createBucket(bucketName);
        System.out.println("Bucket created");
    }
}
