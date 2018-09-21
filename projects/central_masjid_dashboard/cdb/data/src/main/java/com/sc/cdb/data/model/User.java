package com.sc.cdb.data.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class User {
    @Id
    private String id;
    private String companyId;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Boolean active;
}
