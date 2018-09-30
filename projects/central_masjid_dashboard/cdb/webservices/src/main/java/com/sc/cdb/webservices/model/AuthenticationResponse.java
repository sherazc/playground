package com.sc.cdb.webservices.model;

import lombok.Data;

@Data
public class AuthenticationResponse {
    private String token;
    private String firstName;
    private String lastName;
}
