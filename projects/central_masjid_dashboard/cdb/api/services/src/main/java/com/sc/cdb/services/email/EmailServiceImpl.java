package com.sc.cdb.services.email;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service("emailService")
public class EmailServiceImpl implements EmailService {

    @Override
    public void send(String from, String to, String templateName, Map<String, String> attributes) {
        String emailBody = formatTemplate(templateName, attributes);
        send(from, to, emailBody);
    }

    private void send(String from, String to, String emailBody) {

    }


    private String formatTemplate(String templateName, Map<String, String> attributes) {
        return null;
    }
}
