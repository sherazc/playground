package com.sc.cdb.webservices.hadith;

import com.sc.cdb.services.hadith.HadithOfTheDayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/hod", produces = MediaType.APPLICATION_JSON_VALUE)
public class HadithOfTheDayController {

  private HadithOfTheDayService hadithOfTheDayService;

  @Autowired
  public HadithOfTheDayController(
      HadithOfTheDayService hadithOfTheDayService) {
    this.hadithOfTheDayService = hadithOfTheDayService;
  }

  @GetMapping
  public ResponseEntity<?> reminderHistory() {
    return ResponseEntity.ok(this.hadithOfTheDayService.todaysHadith());
  }
}
