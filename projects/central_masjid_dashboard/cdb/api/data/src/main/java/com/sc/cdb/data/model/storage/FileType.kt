package com.sc.cdb.data.model.storage

enum class FileType(val storage: StorageType) {
    CompanyLogo(StorageType.S3CdbClient);

    companion object {
        @JvmStatic
        fun findByName(name: String): FileType? = entries.firstOrNull { it.name.lowercase() == name.lowercase() }
    }
}