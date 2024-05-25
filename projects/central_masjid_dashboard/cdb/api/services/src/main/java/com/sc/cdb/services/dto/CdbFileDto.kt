package com.sc.cdb.services.dto

import com.sc.cdb.data.model.storage.FileType
import com.sc.cdb.data.model.storage.StorageType
import javax.validation.constraints.Size

data class CdbFileDto(
    var id: String,
    var companyId: String,
    var storage: StorageType,
    var fileType: FileType,
    @Size(min = 0, max = 256)
    var directory: String,
    @Size(min = 3, max = 100)
    var fileName: String,
    var dataBase64: String
)