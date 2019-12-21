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

    private void send(String from, String to, String emailBody) {
        AmazonSimpleEmailService client =
                AmazonSimpleEmailServiceClientBuilder.standard()
                        // Replace US_WEST_2 with the AWS Region you're using for
                        // Amazon SES.
                        // .withCredentials()
                        .withRegion(Regions.US_EAST_1).build();
        SendEmailRequest request = new SendEmailRequest()
                .withDestination(
                        new Destination().withToAddresses(to))
                .withMessage(new Message()
                        .withBody(new Body()
                                .withHtml(new Content()
                                        .withCharset("UTF-8").withData(emailBody))
                                .withText(new Content()
                                        .withCharset("UTF-8").withData(emailBody)))

                        .withSubject(new Content()
                                .withCharset("UTF-8").withData("Registration Confirmation")))
                .withSource(from)
                // Comment or remove the next line if you are not using a
                // configuration set
                // .withConfigurationSetName(CONFIGSET)
                ;
        client.sendEmail(request);
        System.out.println("Email sent!");


    }
}
