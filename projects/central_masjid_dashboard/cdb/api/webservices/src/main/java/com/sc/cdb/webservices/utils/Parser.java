package com.sc.cdb.webservices.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class Parser {

  private static final Logger LOGGER = LoggerFactory.getLogger(Parser.class);

  private static final ObjectMapper objectMapper = new ObjectMapper();

  public String serializeObject(Object object) {
    if (object == null) {
      return null;
    }

    String result = null;
    try {
      result = Parser.objectMapper.writeValueAsString(object);
    } catch (JsonProcessingException e) {
      LOGGER.error("Failed to Serialize {} ", object);
    }

    return result;
  }
}
