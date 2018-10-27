package com.sc.cdb;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("service")
@Deprecated
public class ServiceProperties {

    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
