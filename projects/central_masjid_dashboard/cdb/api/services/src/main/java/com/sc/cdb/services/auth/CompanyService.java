package com.sc.cdb.services.auth;

import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.cc.CustomConfiguration;
import com.sc.cdb.services.model.ServiceResponse;

import java.util.List;
import java.util.Optional;

public interface CompanyService {
    Optional<Company> findCompanyById(String companyId);

    ServiceResponse<Company> createOrUpdate(Company company);

    List<Company> findAll();

    List<Company> findAllActive();

    @Deprecated
    List<Company> findAllActiveCompanyUrl();

    @Deprecated
    List<Company> findAllCompanyUrl();

    List<CustomConfiguration> findCompanyConfigurations(String companyId);

    ServiceResponse<Company> activateCompany(String companyId, boolean active);

    ServiceResponse<Void> deleteCompany(String companyId);
}
