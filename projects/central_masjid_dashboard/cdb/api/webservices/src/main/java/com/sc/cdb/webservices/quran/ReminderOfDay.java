package com.sc.cdb.webservices.quran;

import java.util.List;

import com.sc.reminder.api.domain.AyaDetail;
import com.sc.reminder.api.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/rod", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReminderOfDay {

  private ReminderOfDayService reminderOfDayService;

  @Autowired
  public ReminderOfDay(ReminderOfDayService reminderOfDayService) {
    this.reminderOfDayService = reminderOfDayService;
  }

  @GetMapping
  public ResponseEntity<?> reminderHistory(
      @RequestParam(value = "translation", defaultValue = "English_-_Saheeh_International")
          String translation,
      @RequestParam(value = "history", defaultValue = "0")
          int history,
      @RequestParam(value = "cb", required = false)
          String cb) {

    SearchService searchService = new ResourceSearchService();
    searchService.setTranslationDisplayName(translation);

    List<AyaDetail> ayaDetails = searchService.search(history);

    if (ayaDetails != null && ayaDetails.size() == 1 && history == 0) {
      return generateResponse(ayaDetails.get(0), cb);
    } else {
      return generateResponse(ayaDetails, cb);
    }
  }

  private ResponseEntity<?> generateResponse(Object responseObject, String cb) {
    if (reminderOfDayService.validCallback(cb)) {
      return ResponseEntity.ok(reminderOfDayService.makeJsonpScript(cb, responseObject));
    } else {
      return ResponseEntity.ok(responseObject);
    }
  }
}
