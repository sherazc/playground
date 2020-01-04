package com.sc.cdb.services.email;

import java.util.Map;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.Body;
import com.amazonaws.services.simpleemail.model.Content;
import com.amazonaws.services.simpleemail.model.Destination;
import com.amazonaws.services.simpleemail.model.Message;
import com.amazonaws.services.simpleemail.model.SendEmailRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service("emailService")
public class EmailServiceImpl implements EmailService {

    public static final String CHARACTER_SET = "UTF-8";

    private TemplateEngine templateEngine;

    public EmailServiceImpl(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    @Override
    public void send(String from, String to, String subject, String templateName, Map<String, Object> attributes) {
        String emailBody = templateEngine.parse(templateName, attributes);
        send(from, to, subject, emailBody);
    }

    private void send(String from, String to, String subject, String emailBody) {
        try {
            log.debug("Sending email from {}, to {}.", from, to);
            AmazonSimpleEmailService client =
                    AmazonSimpleEmailServiceClientBuilder.standard()
                            // Replace US_WEST_2 with the AWS Region you're using for
                            // Amazon SES.
                            // .withCredentials()
                            .withRegion(Regions.US_EAST_1).build();

            log.debug("AmazonSimpleEmailService created " + client);

            SendEmailRequest request = new SendEmailRequest()
                    .withDestination(
                            new Destination().withToAddresses(to))
                    .withMessage(new Message()
                            .withBody(new Body()
                                    .withHtml(new Content()
                                            .withCharset(CHARACTER_SET).withData(emailBody))
                                    .withText(new Content()
                                            .withCharset(CHARACTER_SET).withData(emailBody)))

                            .withSubject(new Content()
                                    .withCharset(CHARACTER_SET).withData(subject)))
                    .withSource(from)
                    // Comment or remove the next line if you are not using a
                    // configuration set
                    // .withConfigurationSetName(CONFIGSET)
                    ;


            log.debug("SendEmailRequest created " + request);

            log.debug("Now sending email.");
            client.sendEmail(request);
            log.debug("Email sent");
        } catch (Exception e) {
            log.error("Error during sending email", e);
        }
    }
}
