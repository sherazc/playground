package com.sc.cdb.webservices.prayer;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

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

// https://www.callicoder.com/spring-boot-file-upload-download-rest-api-example/

/*
IMPORT
======

UI Upload
---------
Create Button to upload file and call API - Validate Import


API - Validate Import
---------------------
File upload
Validate file
    Create new ServiceResponse
    if errors
        add errors to field errors
        make target empty
        successful false
    If No errors
        Create prayer object from each line



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
    public ResponseEntity<ServiceResponse<List<Prayer>>> validateImport(@RequestParam("file") MultipartFile file) {
        try {
            ServiceResponse<List<Prayer>> serviceResponse = prayerImport
                    .importPrayersFile(file.getName(), file.getContentType(), file.getInputStream());
            return ResponseEntity.ok(serviceResponse);
        } catch (IOException e) {
            ServiceResponse.ServiceResponseBuilder<List<Prayer>> builder = ServiceResponse.builder();
            builder.message("Unable to read uploaded file");
            return ResponseEntity.badRequest().body(builder.build());
        }
    }

    @GetMapping(value = "/export/{companyId}")
    public void exportPrayer(HttpServletResponse response, @PathVariable String companyId) throws IOException {
        ServiceResponse<File> serviceResponse = prayerExporter.exportPrayerToWriter(companyId);
        PrintWriter writer = response.getWriter();
        if (serviceResponse.isSuccessful()) {
            File file = serviceResponse.getTarget();
            response.setContentType("text/csv");
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
