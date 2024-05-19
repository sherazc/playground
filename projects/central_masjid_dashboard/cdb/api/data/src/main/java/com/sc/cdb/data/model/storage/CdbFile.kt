package com.sc.cdb.data.model.storage

import org.bson.types.ObjectId
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document
data class CdbFile(
    @Id
    val id: ObjectId,
    val storage: StorageType,
    val directory: String,
    val fileName: String,
)
