package com.sc.cdb.services.storage

import lombok.extern.slf4j.Slf4j
import mu.KotlinLogging
import org.springframework.stereotype.Service
import software.amazon.awssdk.core.ResponseBytes
import software.amazon.awssdk.core.sync.RequestBody
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest
import software.amazon.awssdk.services.s3.model.GetObjectRequest
import software.amazon.awssdk.services.s3.model.GetObjectResponse
import software.amazon.awssdk.services.s3.model.HeadObjectRequest
import software.amazon.awssdk.services.s3.model.NoSuchKeyException
import software.amazon.awssdk.services.s3.model.PutObjectRequest

interface StorageManager {
    fun exists(storage: String, directory: String, fileName: String): Boolean
    fun size(storage: String, directory: String, fileName: String): Long
    fun delete(storage: String, directory: String, fileName: String): Boolean
    fun read(storage: String, directory: String, fileName: String): ByteArray
    fun write(storage: String, directory: String, fileName: String, data: ByteArray)
}

@Service
@Slf4j
class StorageS3Impl(private val s3ConnectionManager: S3ConnectionManager) : StorageManager {
    private val logger = KotlinLogging.logger {}

    override fun exists(storage: String, directory: String, fileName: String): Boolean =
        size(storage, directory, fileName) > 0

    override fun size(storage: String, directory: String, fileName: String): Long {
        val key = buildObjectKey(directory, fileName)
        var size: Long
        logger.debug { "S3 - Getting size of file: $key" }
        s3ConnectionManager.connect().use {
            try {
                val headObjectRequest = HeadObjectRequest
                    .builder()
                    .bucket(storage)
                    .key(key)
                    .build()

                size = it.headObject(headObjectRequest).contentLength()
            } catch (e: NoSuchKeyException) {
                size = -1
                logger.error("S3 - Can not find file: $key", e)
            }
        }
        return size;
    }

    override fun delete(storage: String, directory: String, fileName: String): Boolean {
        if (!exists(storage, directory, fileName)) {
            return false
        }

        val key = buildObjectKey(directory, fileName)
        logger.debug { "S3 - Deleting file: $key" }
        s3ConnectionManager.connect().use {
            val deleteObjectRequest = DeleteObjectRequest
                .builder()
                .bucket(storage)
                .key(key)
                .build()
            val deleteObjectResponse = it.deleteObject(deleteObjectRequest)
            println("Delete file http status code: ${deleteObjectResponse.sdkHttpResponse().statusCode()}")
            return true
        }
    }

    override fun read(storage: String, directory: String, fileName: String): ByteArray {
        if (!exists(storage, directory, fileName)) {
            return ByteArray(0)
        }
        val key = buildObjectKey(directory, fileName)
        logger.debug { "S3 - Reading file: $key" }
        s3ConnectionManager.connect().use {
            val getObjectRequest = GetObjectRequest
                .builder()
                .bucket(storage)
                .key(key)
                .build()
            val objectAsBytes: ResponseBytes<GetObjectResponse> = it.getObjectAsBytes(getObjectRequest)
            return objectAsBytes.asByteArray()
        }
    }

    override fun write(storage: String, directory: String, fileName: String, data: ByteArray) {
        val key = buildObjectKey(directory, fileName)
        logger.debug { "S3 - Writing file: $key" }
        s3ConnectionManager.connect().use { s3 ->
            val putObjectRequest = PutObjectRequest
                .builder()
                .bucket(storage)
                .key(key)
                .build()
            s3.putObject(putObjectRequest, RequestBody.fromBytes(data))
        }
    }


    private fun buildObjectKey(directory: String, fileName: String): String = "$directory/$fileName"
}