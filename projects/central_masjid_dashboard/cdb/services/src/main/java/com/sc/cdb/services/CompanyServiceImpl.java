package com.sc.cdb.services;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.UserRepository;
import com.sc.cdb.services.model.CompanyRegisterModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class CompanyServiceImpl implements CompanyService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CompanyServiceImpl.class);

    private CompanyRepository companyRepository;
    private UserRepository userRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository,
                              UserRepository userRepository) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
    }

    @Override
    public CompanyRegisterModel registerCompany(CompanyRegisterModel companyRegisterModel) {
        if (companyRegisterModel.getCompany() == null
                || companyRegisterModel.getAdminUser() == null) {
            LOGGER.debug("Can not register company. Company or Admin user missing");
            return null;
        }

        Company company = companyRegisterModel.getCompany();
        LOGGER.debug("Registering company {}", company.getName());
        Company savedCompany = companyRepository.save(company);

        User adminUser = companyRegisterModel.getAdminUser();
        adminUser.setCompanyId(savedCompany.getId());
        LOGGER.debug("Adding admin user {} for company {} id {}",
                adminUser.getEmail(), savedCompany.getName(), adminUser.getCompanyId());
        User savedAdminUser = this.userRepository.save(adminUser);

        companyRegisterModel.setCompany(savedCompany);
        companyRegisterModel.setAdminUser(savedAdminUser);
        return companyRegisterModel;
    }
}
