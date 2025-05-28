package com.sc.kafka04.dto;

import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record RegisterUserRecord(
    Long id,
    @Size(min = 1, max = 5, message = "User name should be between 1 and 5")
    String userName,
    String email,
    String userPassword,
    String userRole,

    LocalDateTime registerTime) {
}
