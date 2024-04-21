/*
package com.sc.aws;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.Bucket;

import java.util.List;

public class Step2_ListBuckets {
    public static void main(String[] args) {
        AmazonS3 s3 = AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_1)
                .build();

        List<Bucket> buckets = s3.listBuckets();
        buckets.forEach(System.out::println);
    }
}
*/
