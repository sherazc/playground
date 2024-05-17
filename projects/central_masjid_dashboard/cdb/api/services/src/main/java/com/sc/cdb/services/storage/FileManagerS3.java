package com.sc.cdb.services.storage;

import com.sc.cdb.config.AppConfiguration;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectResponse;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@Slf4j
public class FileManagerS3 implements FilesManager {

    private final S3ConnectionManager s3ConnectionManager;

    public FileManagerS3(S3ConnectionManager s3ConnectionManager) {
        this.s3ConnectionManager = s3ConnectionManager;
    }

    @Override
    public boolean exists(String bucketName, String directory, String fileName) {

        return size(bucketName, directory, fileName) > 0;
    }

    @Override
    public long size(String bucketName, String directory, String fileName) {
        String key = buildObjectKey(directory, fileName);
        long size;
        try (S3Client s3 = s3ConnectionManager.connect()) {
            try {
                HeadObjectRequest headObjectRequest = HeadObjectRequest
                        .builder()
                        .bucket(bucketName)
                        .key(key)
                        .build();
                size = s3.headObject(headObjectRequest).contentLength();
            } catch (NoSuchKeyException e) {
                log.warn("{} do not exists in s3.", key);
                size = -1;
            }
        }
        return size;
    }


    @Override
    public boolean delete(String bucketName, String directory, String fileName) {
        if (!exists(bucketName, directory, fileName)) {
            return false;
        }

        String key = buildObjectKey(directory, fileName);
        try (S3Client s3 = s3ConnectionManager.connect()) {

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest
                    .builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();

            // TODO: Look into how to get delete status.
            //  Search online could not find a good solution
            DeleteObjectResponse deleteObjectResponse = s3.deleteObject(deleteObjectRequest);

            System.out.println("Delete file http status code: "+ deleteObjectResponse.sdkHttpResponse().statusCode());

            return true;
        }
    }

    @Override
    public byte[] read(String bucketName, String directory, String fileName) {
        if (!exists(bucketName, directory, fileName)) {
            return new byte[0];
        }

        String key = buildObjectKey(directory, fileName);
        try (S3Client s3 = s3ConnectionManager.connect()) {
            GetObjectRequest getObjectRequest = GetObjectRequest
                    .builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
            ResponseBytes<GetObjectResponse> objectAsBytes = s3.getObjectAsBytes(getObjectRequest);
            return objectAsBytes.asByteArray();
        }
    }

    @Override
    public boolean write(String bucketName, String directory, String fileName, byte[] data) {
        String key = buildObjectKey(directory, fileName);

        try (S3Client s3 = s3ConnectionManager.connect()) {
            PutObjectRequest putObjectRequest = PutObjectRequest
                    .builder()
                    .bucket(bucketName)
                    .key(key)
                    .build();
            s3.putObject(putObjectRequest, RequestBody.fromBytes(data));
        }
        return false;
    }

    private String buildObjectKey(String directory, String fileName) {
        return directory + "/" + fileName;
    }
}
