package com.sc.service.random;

import org.junit.Assert;
import org.junit.Test;

import java.util.Random;

public class RandomAyaNumberTest {

    private RandomAyaNumber randomAyaNumber = new RandomAyaNumber();


    @Test
    public void testDaysSinceEpoch() throws Exception {
        int daysSinceEpoch = randomAyaNumber.daysSinceEpoch();
        Assert.assertTrue(daysSinceEpoch > 0);
        System.out.println(daysSinceEpoch);
    }

    @Test
    public void testGenerateTodayRandomAyaNumber() {
        int todayRandomAyaNumber = randomAyaNumber.generateRandomAyaNumber();
        System.out.println(todayRandomAyaNumber);
        for (int i = 0; i < 10; i++) {
            Assert.assertEquals(todayRandomAyaNumber, randomAyaNumber.generateRandomAyaNumber());
        }

    }


    @Test
    public void testManyRandomNumber() {
        Random random = new Random(6230);

        for (int i = 0; i < 100000; i++) {
            int randomInt = random.nextInt(6231);
            if (randomInt > 6229) {
                System.out.println(randomInt);
            }

        }
    }
}