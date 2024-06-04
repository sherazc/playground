package com.sc.cdb.webservices.dto

import java.time.LocalDateTime
import javax.validation.constraints.NotNull
import javax.validation.constraints.Pattern
import javax.validation.constraints.Size

data class UploadRequestDto(
    @Size(min = 3, max = 100)
    @Pattern(regexp = "")
    val fileName: String,
    @NotNull
    val dataBase64: String,
    val createDate: LocalDateTime?
)
