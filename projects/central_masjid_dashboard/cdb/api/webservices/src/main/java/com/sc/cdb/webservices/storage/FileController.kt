package com.sc.cdb.webservices.storage

import com.sc.cdb.data.model.storage.FileType
import com.sc.cdb.services.dto.CdbFileDto
import com.sc.cdb.services.storage.FileService
import com.sc.cdb.webservices.dto.UploadRequestDto
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import javax.validation.Valid

//@Validated
//@RestController
//@RequestMapping("/api/storage")
class FileController(private val fileService: FileService) {

//    @PostMapping("/companyId/{companyId}/fileType/{fileTypeString}")
    fun uploadFile(@RequestBody @Valid uploadRequest: UploadRequestDto,
                   @PathVariable companyId: String,
                   @PathVariable fileTypeString: String): ResponseEntity<String> {

        val fileType = FileType.findByName(fileTypeString).takeIf { it != null }
            ?: throw RuntimeException("Invalid File Type")

        val createDate: LocalDateTime = uploadRequest.createDate.let { LocalDateTime.now() }

        val cdbFileDto = CdbFileDto(
            companyId, fileType,
            uploadRequest.fileName,
            uploadRequest.dataBase64,
            createDate, "")

        fileService.upload(cdbFileDto)
        return ResponseEntity.ok("Worked");
    }

//    @GetMapping
    fun getFile(): ResponseEntity<String> {
        return ResponseEntity.ok("Worked2");
    }
}

