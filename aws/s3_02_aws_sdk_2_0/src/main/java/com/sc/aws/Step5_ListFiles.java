
package com.sc.aws;


import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ListObjectsRequest;
import software.amazon.awssdk.services.s3.model.ListObjectsResponse;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.util.List;

public class Step5_ListFiles {

    public static void main(String[] args) {
        String bucketName = "s3-practice02-sheraz";
        try (S3Client s3 = S3Client.builder().region(Region.US_EAST_1).build()) {
            ListObjectsRequest listObjectsRequest = ListObjectsRequest
                    .builder()
                    .bucket(bucketName)
                    .build();

            ListObjectsResponse listObjectsResponse = s3.listObjects(listObjectsRequest);
            List<S3Object> s3ObjectList = listObjectsResponse.contents();
            s3ObjectList.forEach(s3Object -> {
                System.out.println("==================");
                System.out.println("S3Object.key()=" + s3Object.key());
                System.out.println("S3Object.size()=" + s3Object.size() + " bytes");
                System.out.println("S3Object.owner()=" + s3Object.owner());
            });
        }
    }
}
