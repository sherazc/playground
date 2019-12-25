package com.sc.cdb.services.auth;

import com.sc.cdb.data.dao.CompanyDao;
import com.sc.cdb.data.dao.PicklistDao;
import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.CustomConfiguration;
import com.sc.cdb.data.model.picklist.Configuration;
import com.sc.cdb.data.repository.CentralControlRepository;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class CompanyServiceImpl implements CompanyService {
    private static final Logger LOG = LoggerFactory.getLogger(CompanyServiceImpl.class);

    private CompanyRepository companyRepository;
    private PicklistDao picklistDao;
    private CentralControlRepository centralControlRepository;
    private CompanyDefaultsCreator companyDefaultsCreator;
    private CompanyDao companyDao;

    public CompanyServiceImpl(
            CompanyRepository companyRepository,
            PicklistDao picklistDao,
            CentralControlRepository centralControlRepository,
            CompanyDefaultsCreator companyDefaultsCreator,
            CompanyDao companyDao) {
        this.companyRepository = companyRepository;
        this.picklistDao = picklistDao;
        this.centralControlRepository = centralControlRepository;
        this.companyDefaultsCreator = companyDefaultsCreator;
        this.companyDao = companyDao;
    }

    @Override
    public Optional<Company> findCompanyById(String companyId) {
        if (StringUtils.isBlank(companyId)) {
            return Optional.empty();
        }
        return companyRepository.findById(companyId);
    }

    /*
    companyRepository.save() works for both create or update.
    That why created a service method that creates or updates.
    */
    @Override
    public ServiceResponse<Company> createOrUpdate(Company company) {
        LOG.debug("Saving company {}", company.getName());

        ServiceResponse.ServiceResponseBuilder<Company> builder = ServiceResponse.builder();
        builder.target(company);

        if (StringUtils.isBlank(company.getId())) {
            company.setId(null);
        }

        boolean update = StringUtils.isNotBlank(company.getId());

        Optional<Company> existingCompanyByNameOptional = getExistingCompanyByName(company, update);
        if (existingCompanyByNameOptional.isPresent()) {
            String errorMessage = MessageFormat.format(
                    "{0} name already exists.", existingCompanyByNameOptional.get().getName());
            LOG.error(errorMessage);
            return builder.build().rejectField("company.name", errorMessage);
        }

        Optional<Company> existingCompanyByUrlOptional = getExistingCompanyByUrl(company, update);
        if (existingCompanyByUrlOptional.isPresent()) {
            String errorMessage = MessageFormat.format(
                    "{0} url already exists.", existingCompanyByUrlOptional.get().getUrl());
            LOG.error(errorMessage);
            return builder.build().rejectField("company.url", errorMessage);
        }

        Company savedCompany = companyRepository.save(company);
        builder.target(savedCompany);

        // Create company default items
        if (savedCompany != null) {
            companyDefaultsCreator.createAndSaveIfNotExists(savedCompany.getId());
        }

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
        LOG.debug("Retrieving all companies.");
        return this.companyRepository.findAll();
    }

    @Override
    public List<Company> findAllCompanyUrl() {
        return this.companyRepository.findAllCompanyUrl();
    }

    @Override
    public List<CustomConfiguration> findCompanyConfigurations(String companyId) {
        if (StringUtils.isBlank(companyId)) {
            return List.of();
        }

        List<CustomConfiguration> customConfigurations;
        Optional<CentralControl> centralControlOptional =
                centralControlRepository.findByCompanyId(new ObjectId(companyId));

        if (centralControlOptional.isPresent()
                && centralControlOptional.get().getCustomConfigurations() != null) {
            customConfigurations = centralControlOptional.get().getCustomConfigurations();
        } else {
            customConfigurations = new ArrayList<>();
        }

        List<Configuration> picklistConfigurations = this.picklistDao.getAllConfiguration();
        if (picklistConfigurations != null && !picklistConfigurations.isEmpty()) {
            picklistConfigurations.forEach(
                    configuration -> mergeOrAddConfiguration(configuration, customConfigurations)
            );

        }
        return customConfigurations;
    }

    @Override
    public boolean activateCompany(String companyId, boolean active) {
        return companyDao.activateCompany(companyId, active);
    }

    private void mergeOrAddConfiguration(Configuration configuration, List<CustomConfiguration> customConfigurations) {
        Optional<CustomConfiguration> foundOptional = customConfigurations
                .stream()
                .filter(customConfiguration -> StringUtils.equals(configuration.getName(), customConfiguration.getName()))
                .findFirst();

        foundOptional.ifPresentOrElse(customConfiguration -> {
            if (StringUtils.isBlank(customConfiguration.getValue())) {
                customConfiguration.setValue(configuration.getDefaultValue());
            }
        }, () -> customConfigurations
                .add(new CustomConfiguration(configuration.getName(), configuration.getDefaultValue())));
    }

    private Optional<Company> getExistingCompanyByName(Company company, boolean update) {
        LOG.debug("Searching for existing company. Match name but not id. id={}, companyName={}", company.getId(), company.getName());
        Optional<Company> existingCompanyOptional;
        if (update) {
            existingCompanyOptional = this.companyRepository.findByIdIsNotAndNameIgnoreCase(company.getId(), company.getName());
        } else {
            existingCompanyOptional = this.companyRepository.findByNameIgnoreCase(company.getName());
        }
        return existingCompanyOptional;
    }

    private Optional<Company> getExistingCompanyByUrl(Company company, boolean update) {
        LOG.debug("Searching for existing company. Match Url but not id. id={}, url={}", company.getId(), company.getUrl());
        Optional<Company> existingCompanyOptional;
        if (update) {
            existingCompanyOptional = this.companyRepository.findByIdIsNotAndUrlIgnoreCase(company.getId(), company.getUrl());
        } else {
            existingCompanyOptional = this.companyRepository.findByUrlIgnoreCase(company.getUrl());
        }
        return existingCompanyOptional;
    }
}
