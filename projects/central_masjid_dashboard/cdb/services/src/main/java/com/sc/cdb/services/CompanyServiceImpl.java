package com.sc.cdb.services;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.services.model.CompanyRegisterModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Component
public class CompanyServiceImpl implements CompanyService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CompanyServiceImpl.class);

    private CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public CompanyRegisterModel registerCompany(CompanyRegisterModel companyRegisterModel) {
        if (companyRegisterModel.getCompany() == null
                || companyRegisterModel.getAdminUser() == null) {
            LOGGER.debug("Can not register company. Company or Admin user missing");
            return null;
        }
        Company company = companyRegisterModel.getCompany();
        User adminUser = companyRegisterModel.getAdminUser();
        LOGGER.debug("Registering company {}", company.getName());
        Company savedCompany = companyRepository.save(company);

        return companyRegisterModel;
    }
}
