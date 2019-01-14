package com.sc.cdb.data.model;

import lombok.Data;

@Data
public class UserCompany extends User {
    private Company company;
}
