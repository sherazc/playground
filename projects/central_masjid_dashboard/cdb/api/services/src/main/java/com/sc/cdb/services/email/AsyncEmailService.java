package com.sc.cdb.services.email;

import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("asyncEmailService")
public class AsyncEmailService implements EmailService {

    private ExecutorService executorService;

    private EmailService emailService;

    public AsyncEmailService(@Qualifier("emailService") EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    public void send(String from, String to, String subject, String templateName, Map<String, Object> attributes) {
        if (executorService == null || executorService.isShutdown()) {
            executorService = Executors.newCachedThreadPool();
        }

        Callable<Void> sendEmail = () -> {
            emailService.send(from, to, subject, templateName, attributes);
            return null;
        };

        executorService.submit(sendEmail);
    }
}
