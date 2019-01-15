package com.sc.cdb.webservices.auth.model;

import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.auth.User;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String token;
    private User user;
    private Company company;
}
