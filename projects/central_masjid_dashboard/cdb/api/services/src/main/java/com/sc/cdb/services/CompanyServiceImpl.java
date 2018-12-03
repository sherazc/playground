package com.sc.cdb.services;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.List;
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

    @Override
    public ServiceResponse<Company> createOrUpdate(Company company) {
        LOG.debug("Registering company {}", company.getName());

        ServiceResponse.ServiceResponseBuilder<Company> builder = ServiceResponse.builder();
        builder.target(company);

        if (StringUtils.isBlank(company.getId())) {
            company.setId(null);
        }

        boolean update = StringUtils.isNotBlank(company.getId());
        Optional<Company> existingCompanyOptional = getExistingCompany(company, update);

        if (existingCompanyOptional.isPresent()) {
            String errorMessage = MessageFormat.format(
                    "{0} already exists.", existingCompanyOptional.get().getName());
            LOG.error(errorMessage);
            return builder.build().rejectField("company.name", errorMessage);
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
        LOG.debug(successMessage);
        return builder.build().accept(successMessage);
    }

    @Override
    public List<Company> findAll() {
        return this.companyRepository.findAll();
    }

    private Optional<Company> getExistingCompany(Company company, boolean update) {

        Optional<Company> existingCompanyOptional;
        if (update) {
            existingCompanyOptional = this.companyRepository.findByIdIsNotAndNameIgnoreCase(company.getId(), company.getName());
        } else {
            existingCompanyOptional = this.companyRepository.findByNameIgnoreCase(company.getName());
        }
        return existingCompanyOptional;
    }
}
