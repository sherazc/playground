package com.sc.cdb.services.dto

import com.sc.cdb.data.model.storage.FileType
import java.time.LocalDateTime

data class CdbFileDto(
    val companyId: String,
    val fileType: FileType,
    val fileName: String,
    val dataBase64: String,
    val createDate: LocalDateTime,
    val directory: String
) {
}