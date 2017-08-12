package com.sc.app;


import java.security.SecureRandom;
import java.util.Random;

public class MyExample {
    public static void main(String[] args) {
        int limit = 10;
        int seed = 10;
        // Random secureRandom1 = new SecureRandom();
        Random secureRandom1 = new Random();
        secureRandom1.setSeed(seed);

        // Random secureRandom2 = new SecureRandom();
        Random secureRandom2 = new Random();
        secureRandom2.setSeed(seed);

        for (int i = 0; i < 1000; i++) {
            int random1 = secureRandom1.nextInt(limit) + 1;
            int random2 = secureRandom2.nextInt(limit) + 1;
            System.out.println(i + ": " + random1 + "=" + random2);
        }
    }
}
