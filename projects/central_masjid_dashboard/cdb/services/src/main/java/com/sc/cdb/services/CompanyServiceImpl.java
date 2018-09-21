package com.sc.cdb.services;

import com.sc.cdb.data.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CompanyServiceImpl {
    @Autowired
    private CompanyRepository companyRepository;



    public CompanyRepository getCompanyRepository() {
        return companyRepository;
    }

    public void setCompanyRepository(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }
}
