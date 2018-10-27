package com.sc.cdb.services;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.UserRepository;
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

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
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


        boolean update = StringUtils.isNotBlank(company.getId());
        Optional<Company> existingCompanyOptional = getExistingCompany(company, update);

        if (existingCompanyOptional.isPresent()) {
            return builder.build().rejectField(
                    "company.name",
                    MessageFormat.format(
                            "{0} already exists.", existingCompanyOptional.get().getName()));
        }

        Company savedCompany = companyRepository.save(company);
        builder.target(savedCompany);

        String successMessage;
        if (update) {
            successMessage = MessageFormat.format(
                    "Company {0} successfully updated.",
                    company.getName());
        } else {
            successMessage = MessageFormat.format(
                    "Company {0} successfully created.",
                    company.getName());
        }

        return builder.build().accept(successMessage);
    }

    private Optional<Company> getExistingCompany(Company company, boolean update) {

        Optional<Company> existingUserOptional;
        if (update) {
            existingUserOptional = this.companyRepository.findByIdIsNotAndNameIgnoreCase(company.getId(), company.getName());
        } else {
            existingUserOptional = this.companyRepository.findByNameIgnoreCase(company.getName());
        }
        return existingUserOptional;
    }
}
