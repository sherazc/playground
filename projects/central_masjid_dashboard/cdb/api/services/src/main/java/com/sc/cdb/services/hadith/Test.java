package com.sc.cdb.services.hadith;

import java.util.Random;

public class Test {

  public static void main(String[] args) throws InterruptedException {
    int seed = 10;
    for (int i = 0; i < 100; i++) {
      Thread.sleep(200);
      Random random = new Random(seed);
      System.out.println(random.nextInt(70));
    }
  }
}
