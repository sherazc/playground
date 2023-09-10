package com.sc.pt.batch;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@Slf4j
public class TimeCalculator {
    private static final String REGEX_24HR = "^([01][0-9]|2[0-3]):[0-5][0-9]$";

    private static final SimpleDateFormat SDF = new SimpleDateFormat("HH:mm");
    public String addMinutes(String time, int minutes) {
        if (StringUtils.isBlank(time) || !time.matches(REGEX_24HR)) {
            return time;
        }

        String newTime = "";
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
