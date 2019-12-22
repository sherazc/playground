package com.sc.cdb.services.email;

import java.util.Map;

public interface EmailService {
    void send(String from, String to, String subject,
              String templateName, Map<String, Object> attributes);
}
