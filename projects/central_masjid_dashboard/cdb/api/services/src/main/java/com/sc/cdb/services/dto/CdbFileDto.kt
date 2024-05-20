package com.sc.cdb.services.dto

import com.sc.cdb.data.model.storage.FileType
import com.sc.cdb.data.model.storage.StorageType
import org.bson.types.ObjectId

data class CdbFileDto(
    val id: ObjectId,
    val companyId: ObjectId,
    val storage: StorageType,
    val fileType: FileType,
    val directory: String,
    val fileName: String,
    val dataBase64: String
)