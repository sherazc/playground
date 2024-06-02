package com.sc.cdb.services.storage

import org.springframework.stereotype.Component

@Component
class CdbFileDtoHelper {

    fun slashPrefixSuffix(directory: String?): String {
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
}