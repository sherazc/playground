package com.sc.cdb.data.model.auth;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class CompanyUsers extends Company {
    private List<User> users;
}
