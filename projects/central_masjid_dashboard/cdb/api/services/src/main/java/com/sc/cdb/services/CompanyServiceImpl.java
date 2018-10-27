package com.sc.cdb.services;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.UserRepository;
import com.sc.cdb.services.model.CompanyRegisterModelDeprecated;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.Optional;

@Component
public class CompanyServiceImpl implements CompanyService {
    private static final Logger LOG = LoggerFactory.getLogger(CompanyServiceImpl.class);

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


    // TODO implement update logic like UserService.createOrUpdate()
    @Override
    public ServiceResponse<Company> createOrUpdate(Company company) {
        LOG.debug("Registering company {}", company.getName());

        ServiceResponse.ServiceResponseBuilder<Company> builder = ServiceResponse.builder();
        builder.target(company);

        Optional<Company> existingCompanyOptional = this.companyRepository.findByNameIgnoreCase(company.getName());
        if (existingCompanyOptional.isPresent()) {
            return builder.build().rejectField(
                    "company.name",
                    MessageFormat.format(
                            "{0} already exists.", existingCompanyOptional.get().getName()));
        }

        Company savedCompany = companyRepository.save(company);
        builder.target(savedCompany);

        return builder.build().accept(MessageFormat.format(
                "Company {0} successfully created.",
                company.getName()));
    }
}
