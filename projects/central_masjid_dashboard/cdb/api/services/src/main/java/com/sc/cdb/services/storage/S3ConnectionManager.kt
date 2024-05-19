package com.sc.cdb.services.storage

import com.sc.cdb.config.AppConfiguration
import org.springframework.stereotype.Service
import software.amazon.awssdk.regions.Region
import software.amazon.awssdk.services.s3.S3Client

@Service
class S3ConnectionManager(private val appConfiguration: AppConfiguration) {

    fun connect(): S3Client = S3Client
        .builder()
        .region(region())
        .build()

    fun close(s3Client: S3Client) = s3Client.close()

    fun clientBucketName(): String = appConfiguration.s3.clientBucketName

    fun serverBucketName(): String = appConfiguration.s3.serverBucketName

    private fun region(): Region = Region.of(appConfiguration.s3.region)
}