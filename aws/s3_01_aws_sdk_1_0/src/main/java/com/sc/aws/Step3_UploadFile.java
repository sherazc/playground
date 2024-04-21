package com.sc.aws;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import java.io.File;
import java.net.URISyntaxException;
import java.net.URL;

public class Step3_UploadFile {

    public static final String FILE_NAME = "my_test_file.txt";

    public static void main(String[] args) {
        AmazonS3 s3 = AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_1)
                .build();

        String bucketName = "s3-practice01";
        String fileNameKeyName = FILE_NAME;
        File file = getMyTestFile();
        s3.putObject(bucketName,fileNameKeyName, file);
        System.out.println("File uploaded successfully");

    }

    private static File getMyTestFile() {
        URL resource = Step3_UploadFile.class.getClassLoader().getResource(FILE_NAME);
        try {
            return new File(resource.toURI());
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
    }
}
