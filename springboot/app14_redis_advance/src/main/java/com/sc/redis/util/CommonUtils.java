package com.sc.redis.util;

public class CommonUtils {
  public static void simulateDelay(long millis) {
    try {
      Thread.sleep(millis); // simulate slow service
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }
}
