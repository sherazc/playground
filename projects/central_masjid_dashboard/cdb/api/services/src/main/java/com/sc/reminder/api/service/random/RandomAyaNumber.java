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
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(0);
        calendar.set(Calendar.YEAR, 2000);
        // calendar.setTimeInMillis(Calendar.getInstance().getTimeInMillis() - calendar.getTimeInMillis());
        long currentMilli = calendar.getTimeInMillis();
        long seconds = currentMilli / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;
        int days = (int) (hours / 24);
        LOG.debug("Epoch date: {}", calendar.getTime());
        LOG.debug("Days since epoch: {}", days);
        return days;
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
