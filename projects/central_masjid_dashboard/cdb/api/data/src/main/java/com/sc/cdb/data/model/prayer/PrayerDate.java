package com.sc.cdb.data.model.prayer;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;

public class PrayerDate extends Date {
    private static final DateFormat dateFormat = new SimpleDateFormat();

    public PrayerDate() {
        super();
    }

    public PrayerDate(long date) {
        super(date);
    }

    public PrayerDate(Calendar initialDate, String time24hString) {
        String[] time24hParts = StringUtils.split(time24hString, ":");
        if (!isValidConstructorArgument(initialDate, time24hParts)) {
            throw new RuntimeException(String.format(
                    "Failed to create PrayerDate. initialDate=%tc time24String=%s",
                    initialDate, time24hString));
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(initialDate.getTime());
        calendar.set(Calendar.HOUR_OF_DAY, NumberUtils.toInt(time24hParts[0]));
        calendar.set(Calendar.MINUTE, NumberUtils.toInt(time24hParts[1]));
        this.setTime(calendar.getTimeInMillis());
    }

    private boolean isValidConstructorArgument(Calendar initialDate, String[] time24hParts) {
        return initialDate != null
                && time24hParts != null
                && time24hParts.length > 1
                && StringUtils.length(time24hParts[0]) == 2
                && StringUtils.length(time24hParts[1]) == 2
                && NumberUtils.isParsable(time24hParts[0])
                && NumberUtils.isParsable(time24hParts[1]);
    }
}
