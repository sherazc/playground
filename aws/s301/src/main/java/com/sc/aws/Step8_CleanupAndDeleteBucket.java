package com.sc.aws;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.S3ObjectSummary;

import java.util.List;

public class Step8_CleanupAndDeleteBucket {

    public static void main(String[] args) {
        AmazonS3 s3 = AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_1)
                .build();

        String bucketName = "s3-practice01";

        ObjectListing objectListing = s3.listObjects(bucketName);
        List<S3ObjectSummary> objectSummaries = objectListing.getObjectSummaries();
        objectSummaries.forEach(objectSummary -> {
            System.out.println("Deleting " + objectSummary.getKey());
            s3.deleteObject(bucketName, objectSummary.getKey());
        });
        System.out.println("Files Deleted: " + objectListing.getObjectSummaries().size());

        s3.deleteBucket(bucketName);
        System.out.println(bucketName + " is deleted");
    }
}
