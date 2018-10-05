package com.sc.cdb.services;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.UserRepository;
import com.sc.cdb.services.model.CompanyRegisterModel;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Optional;

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
    public Optional<Company> findCompanyById(String companyId) {
        if (StringUtils.isBlank(companyId)) {
            return Optional.empty();
        }
        return companyRepository.findById(companyId);
    }

    @Override
    public ServiceResponse<CompanyRegisterModel> registerCompany(CompanyRegisterModel companyRegisterModel) {
        ServiceResponse.ServiceResponseBuilder<CompanyRegisterModel> builder = ServiceResponse.builder();
        builder.target(companyRegisterModel);

        if (companyRegisterModel.getCompany() == null
                || companyRegisterModel.getAdminUser() == null) {
            String errorMessage = "Can not register company. Company or Admin user missing";
            LOGGER.error(errorMessage);
            return builder.build().reject(errorMessage);
        }

        User existingUser = this.userRepository.findByEmail(companyRegisterModel.getAdminUser().getEmail());
        if (existingUser != null) {
            String errorMessage = "Can not register company. Company or Admin user missing";
            LOGGER.error(errorMessage);
            return builder.build().reject(errorMessage);
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


        return builder.build().accept("Company and it's admin user registered.");
    }
}
