package com.sc.cdb.services;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.services.model.CompanyRegisterModelDeprecated;
import com.sc.cdb.services.model.ServiceResponse;

import java.util.Optional;

public interface CompanyService {
    Optional<Company> findCompanyById(String companyId);

    Optional<Company> findCompanyByName(String name);

    @Deprecated
    ServiceResponse<CompanyRegisterModelDeprecated> registerCompanyDeprecated(CompanyRegisterModelDeprecated companyRegisterModel);

    ServiceResponse<Company> registerCompany(Company company);
}
