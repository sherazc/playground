package com.sc.cdb.webservices.quran;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/rod", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReminderOfDay {

  @GetMapping
  public ResponseEntity<?> todayReminder() {
    return ResponseEntity.ok("{'id': '100'}");
  }
}
