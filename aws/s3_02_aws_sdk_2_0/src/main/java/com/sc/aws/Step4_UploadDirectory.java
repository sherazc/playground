package com.sc.aws;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3CrtAsyncClientBuilder;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.transfer.s3.S3TransferManager;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Path;

import static software.amazon.awssdk.transfer.s3.SizeConstant.MB;

/**
 * <a href="https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/transfer-manager.html">
 *     https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/transfer-manager.html
 * </a>
 *
 * S3TransferManager can be used to transfer directories. It requires two additional dependencies.
 *
 * - software.amazon.awssdk:s3-transfer-manager
 * - software.amazon.awssdk.crt:aws-crt
 *
 * S3TransferManager uses S3AsyncClient instead of S3Client
 *
 */

public class Step4_UploadDirectory {

    public static final String DIRECTORY_NAME = "my_test_directory";

    public static void main(String[] args) throws InterruptedException {
        File directoryToUpload = getMyTestDirectory();

        S3CrtAsyncClientBuilder s3AsyncBuilder = S3AsyncClient.crtBuilder()
                .credentialsProvider(DefaultCredentialsProvider.create())
                .region(Region.US_EAST_1)
                .targetThroughputInGbps(20.0)
                .minimumPartSizeInBytes(8 * MB);

        try (S3AsyncClient s3Async = s3AsyncBuilder.build()) {

            S3TransferManager.builder().s
        }

        System.out.println("Directory uploaded: " + directoryToUpload);
    }


    private static File getMyTestDirectory() {
        URL resource = Step4_UploadDirectory.class.getClassLoader().getResource(DIRECTORY_NAME);
        try {
            return new File(resource.toURI());
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }
}
