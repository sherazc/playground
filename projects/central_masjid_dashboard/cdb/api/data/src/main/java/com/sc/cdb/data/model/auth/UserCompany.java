package com.sc.cdb.data.model.auth;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class UserCompany extends User {
    private Company company;
}
