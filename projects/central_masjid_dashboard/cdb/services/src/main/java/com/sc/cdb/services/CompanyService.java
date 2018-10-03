package com.sc.cdb.services;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.services.model.CompanyRegisterModel;

import java.util.Optional;

public interface CompanyService {
    Optional<Company> findCompanyById(String companyId);
    CompanyRegisterModel registerCompany(CompanyRegisterModel companyRegisterModel);
}
