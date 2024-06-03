package com.sc.cdb.services.storage

import com.sc.cdb.services.dto.CdbFileDto
import org.springframework.stereotype.Service


@Service
class FileService(private val cdbFileDtoHelper: CdbFileDtoHelper) {
    // On successful upload returns file File ID
    fun upload(file: CdbFileDto): String {
        val key = createKey(file);

        println(key)
        return "mock_file_id"
    }

    private fun createKey(file: CdbFileDto): String {
        val basePath = cdbFileDtoHelper.getBasePath(file)
        val directory = cdbFileDtoHelper.getDirectory(file.directory)
        val fileName = cdbFileDtoHelper.getFileName(file)
        return "${basePath}${directory}${fileName}"
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