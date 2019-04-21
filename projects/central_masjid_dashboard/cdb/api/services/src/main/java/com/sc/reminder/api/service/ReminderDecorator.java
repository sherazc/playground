package com.sc.reminder.api.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.sc.reminder.api.domain.AyaDetail;
import com.sc.reminder.api.domain.ReminderDetail;
import org.springframework.stereotype.Component;

@Component
public class ReminderDecorator {
  public List<ReminderDetail> decorate(List<AyaDetail> ayaDetails,
                                       String translationName) {
    List<ReminderDetail> reminderDetails = new ArrayList<>();
    if (ayaDetails != null) {
      reminderDetails = ayaDetails.stream()
          .map(ad -> new ReminderDetail(ad, translationName))
          .collect(Collectors.toList());
    }
    return reminderDetails;
  }

}
