package com.sc.cdb.webservices.model;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class AuthenticationRequest {
    @NotNull
    private String userId;
    @NotNull
    private String password;
}
