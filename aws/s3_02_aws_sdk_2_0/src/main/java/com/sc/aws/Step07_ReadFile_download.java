package com.sc.aws;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.S3CrtAsyncClientBuilder;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.transfer.s3.S3TransferManager;
import software.amazon.awssdk.transfer.s3.model.CompletedFileDownload;
import software.amazon.awssdk.transfer.s3.model.DownloadFileRequest;
import software.amazon.awssdk.transfer.s3.model.FileDownload;

import java.nio.file.Paths;

import static software.amazon.awssdk.transfer.s3.SizeConstant.MB;

public class Step07_ReadFile_download {

    public static void main(String[] args) {
        String bucketName = "s3-practice02-sheraz";
        String FILE_NAME = "my_test_file.txt";
        String DESTINATION_FILE = System.getProperty("user.home") + "/Downloads/" + FILE_NAME;

        S3CrtAsyncClientBuilder s3AsyncBuilder = S3AsyncClient.crtBuilder()
                .credentialsProvider(DefaultCredentialsProvider.create())
                .region(Region.US_EAST_1)
                .targetThroughputInGbps(20.0)
                .minimumPartSizeInBytes(8 * MB);

        try (S3AsyncClient s3AsyncClient = s3AsyncBuilder.build()) {
            try (S3TransferManager s3TransferManager = S3TransferManager.builder().s3Client(s3AsyncClient).build()) {

                GetObjectRequest getObjectRequest = GetObjectRequest.builder().bucket(bucketName).key(FILE_NAME).build();

                DownloadFileRequest downloadFileRequest = DownloadFileRequest
                        .builder()
                        .getObjectRequest(getObjectRequest)
                        .destination(Paths.get(DESTINATION_FILE))
                        .build();

                FileDownload fileDownload = s3TransferManager.downloadFile(downloadFileRequest);

                CompletedFileDownload downloadResult = fileDownload.completionFuture().join();

                GetObjectResponse getObjectResponse = downloadResult.response();

                System.out.println("Downloaded file. "
                        + DESTINATION_FILE
                        + " content bytes length "
                        + getObjectResponse.contentLength());
            }
        }
    }
}
