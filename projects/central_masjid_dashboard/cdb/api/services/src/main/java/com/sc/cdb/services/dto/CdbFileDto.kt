package com.sc.cdb.services.dto

import com.sc.cdb.data.model.storage.FileType
import com.sc.cdb.data.model.storage.StorageType
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class CdbFileDto(
    var id: String?,
    @NotBlank
    var companyId: String?,
    @NotNull
    var storage: StorageType?,
    @NotNull
    var fileType: FileType?,
    @Size(min = 0, max = 256)
    var directory: String?,
    @Size(min = 3, max = 100)
    var fileName: String?,
    @NotNull
    var dataBase64: String?
)