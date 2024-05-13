package com.sc.cdb.exception;

import java.util.Map;

public class CdbFileNotFoundException extends CdbException {
    public CdbFileNotFoundException(String message, Throwable cause) {
        super(204, message, null, cause);
    }
}
