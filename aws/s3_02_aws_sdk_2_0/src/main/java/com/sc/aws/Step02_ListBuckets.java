package com.sc.aws;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.Bucket;
import software.amazon.awssdk.services.s3.model.ListBucketsRequest;
import software.amazon.awssdk.services.s3.model.ListBucketsResponse;

import java.util.List;

public class Step02_ListBuckets {
    public static void main(String[] args) {
        try (S3Client s3 = S3Client.builder().region(Region.US_EAST_1).build()) {

            ListBucketsRequest listBucketRequest = ListBucketsRequest
                    .builder()
                    .build();

            ListBucketsResponse listBucketsResponse = s3.listBuckets(listBucketRequest);
            List<Bucket> buckets = listBucketsResponse.buckets();
            buckets.forEach(System.out::println);
        }
    }
}
