package com.sc.cdb.services.storage;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Service
public class S3ConnectionManager {

    public S3Client connect() {
        return S3Client
                .builder()
                .region(Region.US_EAST_1)
                .build();
    }

    public void close(S3Client s3Client) {
        s3Client.close();
    }
}
