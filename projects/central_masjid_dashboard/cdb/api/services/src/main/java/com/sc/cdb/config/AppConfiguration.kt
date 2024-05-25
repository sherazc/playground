package com.sc.cdb.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(value = "cdb")
public class AppConfiguration {

    private EmailConfig email = new EmailConfig();
    private S3Config s3 = new S3Config();

    @Data
    public static class EmailConfig {
        private boolean enable;
    }

    @Data
    public static class S3Config {
        private String region;
        // For client files like logo and flyers
        private String clientBucketName;
        // For server files like db backups
        private String serverBucketName;
    }
}

