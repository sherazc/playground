package com.sc.cdb.services.storage;

import com.sc.cdb.config.AppConfiguration;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Service
public class S3ConnectionManager {

    private final AppConfiguration appConfiguration;

    public S3ConnectionManager(AppConfiguration appConfiguration) {
        this.appConfiguration = appConfiguration;
    }

    public S3Client connect() {
        return S3Client
                .builder()
                .region(region())
                .build();
    }

    public String clientBucketName() {
        return appConfiguration.getS3().getClientBucketName();
    }

    public String serverBucketName() {
        return appConfiguration.getS3().getServerBucketName();
    }

    private Region region() {
        return Region.of(appConfiguration.getS3().getRegion());
    }

    public void close(S3Client s3Client) {
        s3Client.close();
    }
}
