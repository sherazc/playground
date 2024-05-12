package com.sc.aws;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteBucketRequest;
import software.amazon.awssdk.services.s3.model.DeleteBucketResponse;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsResponse;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.util.List;

public class Step10_CleanupAndDeleteBucket {

    public static void main(String[] args) {
        String bucketName = "s3-practice02-sheraz";

        try (S3Client s3 = S3Client.builder().region(Region.US_EAST_1).build()) {
            // List Objects
            System.out.println("List Objects");
            ListObjectsRequest listObjectsRequest = ListObjectsRequest
                    .builder()
                    .bucket(bucketName)
                    .build();
            ListObjectsResponse listObjectsResponse = s3.listObjects(listObjectsRequest);
            List<S3Object> s3ObjectList = listObjectsResponse.contents();

            // Delete Objects
            System.out.println("Delete Objects");
            s3ObjectList.forEach(s3Object -> {
                DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest
                        .builder()
                        .bucket(bucketName)
                        .key(s3Object.key())
                        .build();
                s3.deleteObject(deleteObjectRequest);
            });

            // Delete bucket
            System.out.println("Delete bucket");
            DeleteBucketRequest deleteBucketRequest = DeleteBucketRequest
                    .builder()
                    .bucket(bucketName)
                    .build();
            DeleteBucketResponse deleteBucketResponse = s3.deleteBucket(deleteBucketRequest);

            System.out.println(bucketName + " is deleted. " + deleteBucketResponse.toString());
        }
    }
}
