package com.sc.cdb.services.storage

import com.sc.cdb.services.dto.CdbFileDto
import org.springframework.stereotype.Component

@Component
class CdbFileDtoHelper {

    fun getBasePath(file: CdbFileDto): String = "/${file.companyId}/${file.fileType.toString()}"

    fun getDirectory(directory: String?): String {
        if (directory.isNullOrEmpty()) {
            return "/"
        }

        val result = StringBuilder(directory)

        if (directory.isNotEmpty()) {
            if (!directory.startsWith("/")) {
                result.insert(0, "/")
            }

            if (!directory.endsWith("/")) {
                result.append("/")
            }
        }
        return result.toString()
    }

    fun getFileName(file: CdbFileDto): String {
        file.fileName?.split(".").let {""}
        // val fileName = file.fileName.tr
        return ""
    }
}