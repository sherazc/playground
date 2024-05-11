package com.sc.aws;


import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Step03_UploadFile {

    public static final String FILE_NAME = "my_test_file.txt";

    public static void main(String[] args) {
        String bucketName = "s3-practice02-sheraz";
        try (S3Client s3 = S3Client.builder().region(Region.US_EAST_1).build()) {

            PutObjectRequest putObjectRequest = PutObjectRequest
                    .builder()
                    .bucket(bucketName)
                    .key(FILE_NAME)
                    .build();

            Path myTestFilePath = getMyTestFile();
            s3.putObject(putObjectRequest, myTestFilePath);
            System.out.println("Successfully uploaded file " + myTestFilePath.toAbsolutePath());
        }
    }

    private static Path getMyTestFile() {
        URL resource = Step03_UploadFile.class.getClassLoader().getResource(FILE_NAME);
        try {
            return Paths.get(resource.toURI());
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }
}
