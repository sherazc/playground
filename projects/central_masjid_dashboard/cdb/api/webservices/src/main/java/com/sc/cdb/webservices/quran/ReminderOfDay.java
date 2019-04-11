package com.sc.cdb.webservices.quran;

import java.util.List;

import com.sc.reminder.api.domain.AyaDetail;
import com.sc.reminder.api.service.SearchService;
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

    SearchService searchService = new ResourceSearchService();
    searchService.setTranslationDisplayName("English_-_Saheeh_International");

    List<AyaDetail> ayaDetails = searchService.search(2);

    System.out.println(ayaDetails);

    return ResponseEntity.ok("{'id': '100'}");
  }
}
