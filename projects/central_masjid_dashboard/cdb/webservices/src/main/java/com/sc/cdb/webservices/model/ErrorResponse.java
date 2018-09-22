package com.sc.cdb.webservices.model;

import lombok.Builder;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

    public ErrorResponse(String errorCode, BindingResult bindingResult) {
        this.errorCode = StringUtils.defaultString(errorCode);
        this.messages = bindingResult.getAllErrors()
                .stream()
                .map(e -> {
                    StringBuilder message = new StringBuilder(e.getObjectName()).append('.');
                    if (e instanceof FieldError) {
                        message.append(((FieldError)e).getField());
                    }
                    message.append(' ').append(e.getDefaultMessage());
                    return message.toString();
                })
                .collect(Collectors.toList());
    }
}
