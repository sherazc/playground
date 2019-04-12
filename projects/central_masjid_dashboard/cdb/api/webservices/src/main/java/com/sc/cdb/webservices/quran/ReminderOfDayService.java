package com.sc.cdb.webservices.quran;

import java.util.List;

import com.sc.reminder.api.domain.AyaDetail;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class ReminderOfDayService {
  boolean validCallback(String callback) {
    int length = StringUtils.length(callback);
    return length > 1
        && length < 10
        callback.matches("^[a-zA-Z]+$");
  }

  String makeJsonpScript(List<AyaDetail> ayaDetails) {
    return null;
  }
}
