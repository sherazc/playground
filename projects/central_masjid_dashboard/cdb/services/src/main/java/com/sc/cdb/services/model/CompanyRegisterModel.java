package com.sc.cdb.services.model;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import lombok.Data;

@Data
public class CompanyRegisterModel {
    private Company company;
    private User adminUser;
}
