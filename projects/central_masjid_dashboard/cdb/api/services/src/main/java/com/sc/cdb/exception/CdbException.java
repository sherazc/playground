package com.sc.cdb.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashMap;
import java.util.Map;

@Data
@EqualsAndHashCode(callSuper = false)
public class CdbException extends RuntimeException {
    private int errorCode = 500;
    private String message = "";
    private Map<String, String> fields = new HashMap<>();

    public CdbException() {
    }

    public CdbException(int errorCode, String message, Map<String, String> fields) {
        this(errorCode, message, fields, null);
    }

    public CdbException(int errorCode, String message, Map<String, String> fields, Throwable cause) {
        super(message, cause);
        this.message = message;
        this.errorCode = errorCode;
        if (fields != null) {
            this.fields.putAll(fields);
        }
    }
}
