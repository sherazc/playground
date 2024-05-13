package com.sc.cdb.services.storage;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;

import java.io.FileInputStream;

@Service
@AllArgsConstructor
public class FileManagerS3 implements FilesManager {

    private final S3ConnectionManager s3ConnectionManager;

    @Override
    public boolean deleteFile(String directory, String fileName) {
        return false;
    }

    @Override
    public byte[] readFile(String directory, String fileName) {
        try(S3Client s3Client = s3ConnectionManager.connect()) {

        }
        return new byte[0];
    }

    @Override
    public boolean writeFile(String directory, String fileName, byte[] data) {
        return false;
    }

    private String buildObjectKey(String directory, String fileName) {
        return directory + "/" + fileName;
    }
}
