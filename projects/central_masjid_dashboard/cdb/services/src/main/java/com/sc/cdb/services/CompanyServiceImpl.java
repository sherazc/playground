package com.sc.cdb.services;

import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.services.model.CompanyRegisterModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class CompanyServiceImpl implements CompanyService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CompanyServiceImpl.class);

    private CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public CompanyRegisterModel registerCompany(CompanyRegisterModel companyRegisterModel) {
        LOGGER.debug("Registering company");
        return companyRegisterModel;
    }
}
