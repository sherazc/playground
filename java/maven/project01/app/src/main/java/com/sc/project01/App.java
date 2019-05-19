package com.sc.project01;

import java.io.IOException;
import java.util.Properties;

public class App {
  public static void main(String[] args) throws IOException {
    Properties properties = new Properties();
    properties.load(App.class.getResourceAsStream("/application.properties"));
    properties.forEach((key, value) -> {
      System.out.println(key + " = " + value);
    });
  }
}
