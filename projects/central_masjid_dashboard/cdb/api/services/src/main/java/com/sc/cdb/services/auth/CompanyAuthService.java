package com.sc.cdb.services.auth;

import com.sc.cdb.data.model.auth.CompanyUsers;

import java.util.List;


public interface CompanyAuthService {
    List<CompanyUsers> findCompanyUsersByCompanyId(String companyId);
}
