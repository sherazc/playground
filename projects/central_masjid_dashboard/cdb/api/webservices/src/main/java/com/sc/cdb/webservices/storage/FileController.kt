package com.sc.cdb.webservices.storage

import com.sc.cdb.data.model.storage.FileType
import com.sc.cdb.services.dto.CdbFileDto
import com.sc.cdb.services.storage.FileService
import org.springframework.http.ResponseEntity
import org.springframework.validation.Errors
import org.springframework.validation.Validator
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/storage")
class FileController(private val fileService: FileService,
                     private val validator: Validator) {

    @PostMapping("/companyId/{companyId}/fileType/{fileType}")
    fun uploadFile(@RequestBody cdbFileDto: CdbFileDto,
                   @PathVariable companyId: String,
                   @PathVariable fileType: String): ResponseEntity<String> {
        cdbFileDto.fileType = FileType.findByName(fileType)
        cdbFileDto.companyId = companyId

        if (cdbFileDto.createDate == null) {
            cdbFileDto.createDate = LocalDateTime.now()
        }

        // TODO: make it work

        validator.validate(cdbFileDto, null)
        fileService.upload(cdbFileDto)
        return ResponseEntity.ok("Worked");
    }

    @GetMapping
    fun getFile(): ResponseEntity<String> {
        return ResponseEntity.ok("Worked2");
    }
}

