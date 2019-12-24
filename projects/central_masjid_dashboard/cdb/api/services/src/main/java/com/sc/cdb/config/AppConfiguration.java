package com.sc.cdb.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties("cdb")
public class AppConfiguration {

    private EmailConfig email = new EmailConfig();

    @Data
    public static class EmailConfig {
        private boolean enable;
    }
}

