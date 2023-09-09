package com.sc.pt.batch;

import lombok.extern.slf4j.Slf4j;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@Slf4j
public class TimeCalculator {
    private static final SimpleDateFormat SDF = new SimpleDateFormat("HH:mm");
    public String addMinutes(String time, int minutes) {
        String newTime = null;
        Calendar cal = Calendar.getInstance();
        try {
            cal.setTime(SDF.parse(time));
            cal.add(Calendar.MINUTE, minutes);
            newTime = SDF.format(cal.getTime());
        } catch (ParseException e) {
            log.error("Error parsing time=" + time, e);
        }
        return newTime;
    }

}
