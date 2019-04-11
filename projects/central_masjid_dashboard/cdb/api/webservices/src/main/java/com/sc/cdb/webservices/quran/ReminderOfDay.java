package com.sc.cdb.webservices.quran;

import java.util.List;

import com.sc.reminder.api.domain.AyaDetail;
import com.sc.reminder.api.service.SearchService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/rod", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReminderOfDay {

  @GetMapping
  public ResponseEntity<?> todayReminder(
      @RequestParam(value = "translation", defaultValue = "English_-_Saheeh_International")
          String translation,
      @RequestParam(value = "history", defaultValue = "0")
          int history) {

    SearchService searchService = new ResourceSearchService();
    searchService.setTranslationDisplayName(translation);

    List<AyaDetail> ayaDetails = searchService.search(history);

    return ResponseEntity.ok(ayaDetails);
  }
}
