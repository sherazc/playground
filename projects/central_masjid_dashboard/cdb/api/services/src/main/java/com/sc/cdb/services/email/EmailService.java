package com.sc.cdb.services.email;

import java.util.Map;

public interface EmailService {
    void send(String from, String to, String templateName, Map<String, String> attributes);
}
