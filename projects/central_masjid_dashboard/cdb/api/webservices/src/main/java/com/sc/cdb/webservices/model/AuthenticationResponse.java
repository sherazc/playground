package com.sc.cdb.webservices.model;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import lombok.Data;

@Data
public class AuthenticationResponse {
    private String token;
    private User user;
    private Company company;
}
