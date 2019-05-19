package com.sc.project01;

import java.io.IOException;
import java.util.Properties;

import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class AppTest {
  @Test
  public void shouldAnswerWithTrue() throws IOException {
    Properties properties = new Properties();
    properties.load(App.class.getResourceAsStream("/application.properties"));

    String key = properties.getProperty("key");
    System.out.println(key);

    String testKey = properties.getProperty("test.key");
    System.out.println(testKey);
  }
}
