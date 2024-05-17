package com.sc.cdb.services.storage;

import com.sc.cdb.config.AppConfiguration;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@Slf4j
public class FileManagerS3 implements FilesManager {

    private final AppConfiguration appConfiguration;
    private final S3ConnectionManager s3ConnectionManager;

    public FileManagerS3(AppConfiguration appConfiguration, S3ConnectionManager s3ConnectionManager) {
        this.appConfiguration = appConfiguration;
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
        try (S3Client s3 = s3ConnectionManager.connect()) {
            try {
                HeadObjectRequest headObjectRequest = HeadObjectRequest
                        .builder()
                        .bucket(appConfiguration.getS3().getBucketName())
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
    public boolean delete(String directory, String fileName) {
        return false;
    }

    @Override
    public byte[] read(String directory, String fileName) {
        if (!exists(directory, fileName)) {
            return new byte[0];
        }

        String key = buildObjectKey(directory, fileName);
        try (S3Client s3 = s3ConnectionManager.connect()) {
            GetObjectRequest getObjectRequest = GetObjectRequest
                    .builder()
                    .bucket(appConfiguration.getS3().getBucketName())
                    .key(key)
                    .build();
            ResponseBytes<GetObjectResponse> objectAsBytes = s3.getObjectAsBytes(getObjectRequest);
            return objectAsBytes.asByteArray();
        }
    }

    @Override
    public boolean write(String directory, String fileName, byte[] data) {
        String key = buildObjectKey(directory, fileName);

        // TODO get region from application.properties
        Region.of()

        try (S3Client s3 = S3Client.builder().region(Region.US_EAST_1).build()) {
            PutObjectRequest putObjectRequest = PutObjectRequest
                    .builder()
                    .bucket(appConfiguration.getS3().getBucketName())
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
