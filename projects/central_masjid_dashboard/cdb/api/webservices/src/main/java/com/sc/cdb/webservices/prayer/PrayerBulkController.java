package com.sc.cdb.webservices.prayer;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.services.bulk.PrayerImport;
import com.sc.cdb.services.model.ServiceResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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


Sample Header
-------------

Sample Line
-----------


    private Date date;

    private String fajr;
    private String fajrIqama;
    private String dhuhr;
    private String dhuhrIqama;
    private String asr;
    private String asrIqama;
    private String maghrib;
    private String maghribIqama;
    private String isha;
    private String ishaIqama;

    private String sunrise;





 */
@Slf4j
@RequestMapping("/bulk/prayer")
@RestController
public class PrayerBulkController {
    private final Path fileStorageLocation;
    private PrayerImport prayerImport;

    public PrayerBulkController(PrayerImport prayerImport) {
        this.prayerImport = prayerImport;


        this.fileStorageLocation = Paths.get("delete_it/test_upload")
                .toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }


    @PostMapping("/validateImport")
    public ResponseEntity<ServiceResponse<List<Prayer>>> validateImport(@RequestParam("file") MultipartFile file) {
        try {
            ServiceResponse<List<Prayer>> serviceResponse = prayerImport.importPrayersFile(file.getName(), file.getContentType(), file.getInputStream());
            return ResponseEntity.ok(serviceResponse);
        } catch (IOException e) {
            ServiceResponse.ServiceResponseBuilder<List<Prayer>> builder = ServiceResponse.builder();
            builder.message("Unable to read uploaded file");
            return ResponseEntity.badRequest().body(builder.build());
        }
    }


    @PostMapping("/donotUse")
    @Deprecated
    public String uploadFile1(@RequestParam("file") MultipartFile file) {
        String fileName = storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/bulk/prayer/")
                .path(fileName)
                .toUriString();

        log.debug(fileDownloadUri);

        return fileDownloadUri;
    }

    @GetMapping("/export/{fileName:.+}")
    @Deprecated
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }


    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }



    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found " + fileName, ex);
        }
    }
}
