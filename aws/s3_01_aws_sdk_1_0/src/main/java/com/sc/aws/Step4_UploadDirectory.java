package com.sc.aws;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.transfer.MultipleFileUpload;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;

public class Step4_UploadDirectory {

    public static final String DIRECTORY_NAME = "my_test_directory";

    public static void main(String[] args) throws InterruptedException {
        AmazonS3 s3 = AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_1)
                .build();

        String bucketName = "s3-practice01";

        TransferManager transferManager = TransferManagerBuilder
                .standard()
                .withS3Client(s3)
                .build();

        String s3DirectoryPathKeyPrefix = "step4/sub_directory/";
        File directoryToUpload = getMyTestDirectory();
        boolean includeSubDirectories = true;

        MultipleFileUpload multipleFileUpload = transferManager.uploadDirectory(bucketName,
                s3DirectoryPathKeyPrefix, directoryToUpload, includeSubDirectories);

        // upload TransferManager.uploadDirectory() is an async process
        // Wait till it completes
        multipleFileUpload.waitForCompletion();

        // then shutdown
        transferManager.shutdownNow();

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
