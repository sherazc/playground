package com.sc.s4.exception;

public class BusinessLogicException extends RuntimeException{
    public BusinessLogicException() {
        super();
    }

    public BusinessLogicException(String message) {
        super(message);
    }
}
