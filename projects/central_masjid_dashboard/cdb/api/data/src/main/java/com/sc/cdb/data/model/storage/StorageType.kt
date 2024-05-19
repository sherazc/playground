package com.sc.cdb.data.model.storage

enum class StorageType(val type: String) {
    S3CdbClient("cdbClient"), S3CdbServer("cdbServer")
}