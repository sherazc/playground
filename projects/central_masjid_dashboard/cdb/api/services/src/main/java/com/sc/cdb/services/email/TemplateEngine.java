package com.sc.cdb.services.email;

import java.util.Map;

public interface TemplateEngine {
    String parse(String templateName, Map<String, Object> arguments);
}
