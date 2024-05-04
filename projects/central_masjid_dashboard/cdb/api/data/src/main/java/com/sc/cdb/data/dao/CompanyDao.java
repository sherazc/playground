package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.auth.CompanyUsers;

import java.util.List;

public interface CompanyDao extends BaseDao<Company> {
    boolean activateCompany(String companyId, boolean active);
    List<CompanyUsers> findAllCompanyUsers();
    List<CompanyUsers> findCompanyUsersByCompanyId(String companyId);
}
