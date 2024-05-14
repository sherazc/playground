package com.sc.aws;

import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Step09_ReadFile_stream {

    public static void main(String[] args) throws IOException {

        String bucketName = "s3-practice02-sheraz";
        String FILE_NAME = "my_test_file.txt";
        try (S3Client s3 = S3Client.builder().region(Region.US_EAST_1).build()) {

            GetObjectRequest getObjectRequest = GetObjectRequest
                    .builder()
                    .bucket(bucketName)
                    .key(FILE_NAME)
                    .build();

            ResponseInputStream<GetObjectResponse> s3ObjectInputStream = s3.getObject(getObjectRequest);

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(s3ObjectInputStream));

            System.out.println("S3 content of " + FILE_NAME);
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
            }

            s3ObjectInputStream.close();

            // TODO: There is another way of doing it.
            //   Do it if there is time.
            //   https://stackoverflow.com/questions/66808064/get-an-s3object-inputstream-from-a-getobjectresponse-in-aws-java-sdk-2-using-s3a
            //   ResponseInputStream responseInputStream = s3AsyncClient.getObject(GetObjectRequest.builder()
            //        .bucket(bucket)
            //        .key(key)
            //        .build(),
            //   AsyncResponseTransformer.toBlockingInputStream())
        }
    }
}
