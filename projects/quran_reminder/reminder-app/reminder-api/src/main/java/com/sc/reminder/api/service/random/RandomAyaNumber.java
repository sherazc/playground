package com.sc.reminder.api.service.random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Calendar;
import java.util.Random;

public class RandomAyaNumber {
    private static final Logger LOG = LoggerFactory.getLogger(RandomAyaNumber.class);

    public static final int DEFAULT_LIMIT = 6236;

    private int limit;

    private static RandomAyaNumber randomAyaNumber;

    public RandomAyaNumber() {
        this(DEFAULT_LIMIT);
    }

    public RandomAyaNumber(int limit) {
        this.limit = limit;
    }

    public int daysSinceEpoch() {
        Calendar epochCalendar = createEpochCalendar();

        long millisSinceEpoch =
            Calendar.getInstance().getTimeInMillis() - epochCalendar.getTimeInMillis();

        long secondsSinceEpoch = millisSinceEpoch / 1000;
        long minutesSinceEpoch = secondsSinceEpoch / 60;
        long hoursSinceEpoch = minutesSinceEpoch / 60;
        int daysSinceEpoch = (int) (hoursSinceEpoch / 24);
        LOG.debug("Epoch date: {}", epochCalendar.getTime());
        LOG.debug("Days since epoch: {}", daysSinceEpoch);
        return daysSinceEpoch;
    }

    private Calendar createEpochCalendar() {
        Calendar epochCalendar = Calendar.getInstance();
        epochCalendar.set(Calendar.MILLISECOND, 0);
        epochCalendar.set(Calendar.SECOND, 0);
        epochCalendar.set(Calendar.HOUR, 0);
        epochCalendar.set(Calendar.DATE, 0);
        epochCalendar.set(Calendar.MONTH, 0);
        epochCalendar.set(Calendar.MONTH, 0);
        epochCalendar.set(Calendar.YEAR, 2000);
        return epochCalendar;
    }

    public int generateRandomAyaNumber() {
        return this.generateRandomAyaNumber(daysSinceEpoch());
    }

    public int generateRandomAyaNumber(int seed) {
        return new Random(seed).nextInt(this.limit);
    }

    public static RandomAyaNumber getInstance() {
        if (randomAyaNumber == null) {
            randomAyaNumber = new RandomAyaNumber();
        }
        return randomAyaNumber;
    }
}
