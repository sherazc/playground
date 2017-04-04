package com.sc.service.random;

import java.util.Random;

public class RandomAyaNumber {

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
        long currentMilli = System.currentTimeMillis();
        long seconds = currentMilli / 1000;
        long minutes = seconds / 60;
        long hours = minutes / 60;
        int days = (int) (hours / 24);
        //System.out.println("Days since epoch : "  + days);
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
