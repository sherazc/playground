package com.sc.cdb.services;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.services.model.CompanyRegisterModel;
import com.sc.cdb.services.model.ServiceResponse;

import java.util.Optional;

public interface CompanyService {
    Optional<Company> findCompanyById(String companyId);
    ServiceResponse<CompanyRegisterModel> registerCompany(CompanyRegisterModel companyRegisterModel);
}
