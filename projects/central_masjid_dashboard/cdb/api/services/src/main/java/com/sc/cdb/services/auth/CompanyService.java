package com.sc.cdb.services.auth;

import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.services.model.ServiceResponse;

import java.util.List;
import java.util.Optional;

public interface CompanyService {
    Optional<Company> findCompanyById(String companyId);

    ServiceResponse<Company> createOrUpdate(Company company);

    List<Company> findAll();
}
