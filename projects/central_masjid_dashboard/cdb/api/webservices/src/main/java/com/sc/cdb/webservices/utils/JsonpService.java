package com.sc.cdb.webservices.utils;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JsonpService {
  private static final int MIN_CB_LENGTH = 1;
  private static final int MAX_CB_LENGTH = 10;

  private Parser parser;

  @Autowired
  public JsonpService(Parser parser) {
    this.parser = parser;
  }

  public boolean validCallback(String callback) {
    if (StringUtils.isBlank(callback)) {
      return false;
    }
    int length = StringUtils.length(callback);
    return length > MIN_CB_LENGTH
        && length < MAX_CB_LENGTH
        && callback.matches("^[a-zA-Z]\\w+$");
  }

  public String makeJsonpScript(String callback, Object object) {
    String ayaDetailsJson = parser.serializeObject(object);

    return new StringBuilder(callback)
        .append("(")
        .append(ayaDetailsJson)
        .append(")")
        .toString();
  }
}
