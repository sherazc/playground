package com.sc.cdb.services.email;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service("emailService")
public class EmailServiceImpl implements EmailService {

    private TemplateEngine templateEngine;

    public EmailServiceImpl(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    @Override
    public void send(String from, String to, String templateName, Map<String, Object> attributes) {
        String emailBody = templateEngine.parse(templateName, attributes);
        send(from, to, emailBody);
    }

    private void send(String from, String to, String emailBody) {}
}
