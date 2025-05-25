package com.sc.kafka04.dto;

import java.time.LocalDateTime;

public record RegisterUserRecord(
    Long id,
    String userName,
    String userPassword,
    String userRole,
    LocalDateTime registerTime) {
}
