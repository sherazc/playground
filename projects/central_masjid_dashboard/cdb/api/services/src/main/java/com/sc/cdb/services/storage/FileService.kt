package com.sc.cdb.services.storage

import com.sc.cdb.services.dto.CdbFileDto
import org.springframework.stereotype.Service


@Service
class FileService {
    // On successful upload returns file File ID
    fun upload(file: CdbFileDto): String {
        val key = createKey(file);

        println(key)
        return "mock_file_id"
    }

    private fun createKey(file: CdbFileDto): String {
        val key = StringBuilder("/${file.companyId}/${file.fileType.toString()}")
        key.append(slashPrefixSuffix(file.directory))

        return "mock_key"
    }

    private fun slashPrefixSuffix(directory: String?): String {
        if (directory == null) {
            return ""
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


/*
Directory Structure
===================
bucket_name aka storage
    |
    +--companyId
            |
            +--fileType (logo, flyer)
                    |
                    +--directory
                            |
                            +-- fileName



Upload file Flow
================
                FileHelper (Service extension. Task e.g. get absolute path from CdbFileDto and CdbFile)
                    ^
                    |
Controller -> FileService -> FileValidator (File size and extension)
                          -> Virus Scan
                          -> Image Resize(SD, MD, HD) Use java.awt.Image to upload
                          -> StorageManager (Store file content)
                          -> Map CdbFileDto to CdbFile
                          -> CdbFileRepository ()


Throws exception on each failure step
*/