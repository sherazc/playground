package com.sc.cdb.services.model;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CompanyRegisterModel {
    @NotNull
    private Company company;
    @NotNull
    private User adminUser;
}
