package com.sc.kafka04.dto;

public record MyErrorResponse(
    String message,
    String field,
    String errorCode) {
}
