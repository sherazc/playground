package com.sc.cdb.webservices.prayer;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sc.cdb.data.model.common.File;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.bulk.PrayerExporter;
import com.sc.cdb.services.bulk.PrayerImport;
import com.sc.cdb.services.model.ServiceResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.StandardMultipartHttpServletRequest;

// https://www.callicoder.com/spring-boot-file-upload-download-rest-api-example/

/*
IMPORT
======

UI Upload
---------
Create Button to upload file and call API - Validate Import




Validation Service Rules
------------------------
First line is Heading line
Heading sequence
Number of commas in each line
All Date format
All Time format


All dates are available
Each line time sequence
 */
@Slf4j
@RequestMapping("/bulk/prayer")
@RestController
public class PrayerBulkController {
    private PrayerImport prayerImport;
    private PrayerExporter prayerExporter;

    public PrayerBulkController(
            PrayerImport prayerImport, PrayerExporter prayerExporter) {
        this.prayerImport = prayerImport;
        this.prayerExporter = prayerExporter;
    }


    @PostMapping("/validateImport")
    public ResponseEntity<ServiceResponse<List<Prayer>>> validateImport(StandardMultipartHttpServletRequest file) {
        try {
            Optional<MultipartFile> multipartFile = Optional.ofNullable(file.getFile("file"));

            ServiceResponse<List<Prayer>> serviceResponse = prayerImport.importPrayersFile(
                    multipartFile.map(MultipartFile::getOriginalFilename).orElse(null),
                    multipartFile.map(MultipartFile::getContentType).orElse(null),
                    multipartFile.map(this::getInputStream).orElse(null)
            );
            return ResponseEntity.ok(serviceResponse);
        } catch (Exception e) {
            String errorMessage = "Failed to upload file " + e.getMessage();
            ServiceResponse.ServiceResponseBuilder<List<Prayer>> builder = ServiceResponse.builder();
            builder.message(errorMessage);
            log.error(errorMessage, e);
            return ResponseEntity.badRequest().body(builder.build());
        }
    }

    private InputStream getInputStream(MultipartFile multipartFile) {
        InputStream result;
        try {
            result = multipartFile.getInputStream();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return result;
    }

    @GetMapping(value = "/export/{companyId}")
    public void exportPrayer(HttpServletResponse response, @PathVariable String companyId) throws IOException {
        ServiceResponse<File> serviceResponse = prayerExporter.exportPrayerToWriter(companyId);
        PrintWriter writer = response.getWriter();
        if (serviceResponse.isSuccessful()) {
            File file = serviceResponse.getTarget();
            response.setContentType("text/text");
            response.setStatus(HttpServletResponse.SC_OK);
            response.setHeader("Content-Disposition",
                    String.format("attachment; filename=\"%s\"", file.getName()));
            writer.print(file.getContent().toString());
        } else {
            response.setContentType("application/json");
            writer.print(new ObjectMapper().writeValueAsString(serviceResponse));
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
        writer.flush();
    }
}
