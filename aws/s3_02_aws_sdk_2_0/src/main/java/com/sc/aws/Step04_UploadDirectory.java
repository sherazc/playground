package com.sc.aws;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.S3CrtAsyncClientBuilder;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.model.CompletedDirectoryUpload;
import software.amazon.awssdk.transfer.s3.model.DirectoryUpload;
import software.amazon.awssdk.transfer.s3.model.UploadDirectoryRequest;

import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

import static software.amazon.awssdk.transfer.s3.SizeConstant.MB;

/**
 * <a href="https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/transfer-manager.html">
 * https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/transfer-manager.html
 * </a>
 * <p>
 * S3TransferManager can be used to transfer directories. It requires two additional dependencies.
 * <p>
 * - software.amazon.awssdk:s3-transfer-manager
 * - software.amazon.awssdk.crt:aws-crt
 * <p>
 * S3TransferManager uses S3AsyncClient instead of S3Client
 */

public class Step04_UploadDirectory {

    public static final String DIRECTORY_NAME = "my_test_directory";

    public static void main(String[] args) {

        S3CrtAsyncClientBuilder s3AsyncBuilder = S3AsyncClient.crtBuilder()
                .credentialsProvider(DefaultCredentialsProvider.create())
                .region(Region.US_EAST_1)
                .targetThroughputInGbps(20.0)
                .minimumPartSizeInBytes(8 * MB);

        String bucketName = "s3-practice02-sheraz";
        Path directoryToUpload = getMyTestDirectory();

        try (S3AsyncClient s3Async = s3AsyncBuilder.build()) {
            try (S3TransferManager s3TransferManager = S3TransferManager.builder().s3Client(s3Async).build()) {

                UploadDirectoryRequest uploadDirectoryRequest = UploadDirectoryRequest
                        .builder()
                        .source(directoryToUpload)
                        .bucket(bucketName)
                        .build();

                DirectoryUpload directoryUpload = s3TransferManager.uploadDirectory(uploadDirectoryRequest);

                // CompletableFuture.join() vs Future.get()
                // join() works same as get()
                // join() does not throw checked exception where as get() does.
                // get() is defined in Future interface
                // join() is implemented in CompletableFuture class
                CompletedDirectoryUpload completedDirectoryUpload = directoryUpload.completionFuture().join();

                completedDirectoryUpload
                        .failedTransfers()
                        .forEach(failedUpload -> System.out.println("Failed to transfer " + failedUpload));

                System.out.println("""
                        Upload directory completed. {directoryToUpload}
                        Failed transfers: {completedDirectoryUpload.failedTransfers().size()}
                        """);
            }
        }
    }


    private static Path getMyTestDirectory() {
        URL resource = Step04_UploadDirectory.class.getClassLoader().getResource(DIRECTORY_NAME);
        try {
            return Paths.get(resource.toURI());
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }
}
