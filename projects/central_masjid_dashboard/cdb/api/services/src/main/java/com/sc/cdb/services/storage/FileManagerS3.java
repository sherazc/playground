package com.sc.cdb.services.storage;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;

@Service
@Slf4j
public class FileManagerS3 implements FilesManager {

    @Value("${cdb.s3BucketName:MDB-Client}")
    private String s3BucketName;

    private final S3ConnectionManager s3ConnectionManager;

    public FileManagerS3(S3ConnectionManager s3ConnectionManager) {
        this.s3ConnectionManager = s3ConnectionManager;
    }

    @Override
    public boolean exists(String directory, String fileName) {
        return size(directory, fileName) > 0;
    }

    @Override
    public long size(String directory, String fileName) {
        String key = buildObjectKey(directory, fileName);
        long size;
        try (S3Client s3Client = s3ConnectionManager.connect()) {
            try {
                HeadObjectRequest headObjectRequest = HeadObjectRequest
                        .builder()
                        .bucket(s3BucketName)
                        .key(key)
                        .build();
                size = s3Client.headObject(headObjectRequest).contentLength();
            } catch (NoSuchKeyException e) {
                log.warn("{} do not exists in s3.", key);
                size = -1;
            }
        }
        return size;
    }


    @Override
    public boolean delete(String directory, String fileName) {
        return false;
    }

    @Override
    public byte[] read(String directory, String fileName) {
        try (S3Client s3Client = s3ConnectionManager.connect()) {

        }
        return new byte[0];
    }

    @Override
    public boolean write(String directory, String fileName, byte[] data) {
        return false;
    }

    private String buildObjectKey(String directory, String fileName) {
        return directory + "/" + fileName;
    }
}
