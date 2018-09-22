package com.sc.cdb.webservices.model;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
public class ErrorResponse {
    private String errorCode;
    private List<String> messages;

    public ErrorResponse(String errorCode, String ...messages) {
        this(errorCode, messages == null ? new ArrayList<>() : Arrays.asList(messages));
    }

    public ErrorResponse(String errorCode, List<String> messages) {
        this.errorCode = StringUtils.defaultString(errorCode);
        this.messages = messages == null ? new ArrayList<>() : messages;
    }
}
