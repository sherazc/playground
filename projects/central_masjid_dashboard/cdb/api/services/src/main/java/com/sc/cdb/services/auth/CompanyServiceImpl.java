package com.sc.cdb.services.auth;

import com.sc.cdb.data.dao.CompanyDao;
import com.sc.cdb.data.dao.PicklistDao;
import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.CustomConfiguration;
import com.sc.cdb.data.model.picklist.Configuration;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.CentralControlRepository;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.data.repository.UserRepository;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.version.DbVersionService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private static final Logger LOG = LoggerFactory.getLogger(CompanyServiceImpl.class);

    private CompanyRepository companyRepository;
    private CentralControlRepository centralControlRepository;
    private PrayerConfigRepository prayerConfigRepository;
    private UserRepository userRepository;

    private CompanyDefaultsCreator companyDefaultsCreator;
    private PicklistDao picklistDao;
    private CompanyDao companyDao;
    private DbVersionService dbVersionService;


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
    public List<Company> findAllActive() {
        LOG.debug("Retrieving all active companies.");
        List<Company> companyWithUrls = this.companyRepository.findAllActiveCompany();
        List<PrayerConfig> validPrayerConfigs = this.prayerConfigRepository.findValidPrayerConfigs();

        return companyWithUrls.stream()
                .filter(company -> companyExistInPrayerConfigs(company, validPrayerConfigs))
                .collect(Collectors.toList());
    }

    @Deprecated
    @Override
    public List<Company> findAllActiveCompanyUrl() {
        List<Company> companyWithUrls = this.companyRepository.findAllActiveCompanyUrl();
        List<PrayerConfig> validPrayerConfigs = this.prayerConfigRepository.findValidPrayerConfigs();

        return companyWithUrls.stream()
                .filter(company -> companyExistInPrayerConfigs(company, validPrayerConfigs))
                .collect(Collectors.toList());
    }

    @Deprecated
    @Override
    public List<Company> findAllCompanyUrl() {
        List<Company> companyWithUrls = this.companyRepository.findAllCompanyUrl();
        return companyWithUrls;
    }


    private boolean companyExistInPrayerConfigs(Company company, List<PrayerConfig> prayerConfigs) {
        return prayerConfigs.stream()
                .anyMatch(prayerConfig -> company.getId().equals(prayerConfig.getCompanyId()));
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
    public ServiceResponse<Company> activateCompany(String companyId, boolean active) {
        ServiceResponse.ServiceResponseBuilder<Company> responseBuilder = ServiceResponse.builder();
        if (!ObjectId.isValid(companyId)) {
            responseBuilder.message("Invalid companyId");
            return responseBuilder.build();
        }
        boolean successful = companyDao.activateCompany(companyId, active);
        responseBuilder.successful(successful);
        if (successful) {
            dbVersionService.upgradeCompanyListVersion();
            Company company = new Company();
            company.setId(companyId);
            company.setActive(active);
            responseBuilder.target(company);
            responseBuilder.message("Successfully updated Company");
        } else {
            responseBuilder.message("Failed to update Company");
        }
        return responseBuilder.build();
    }

    @Override
    public ServiceResponse<Void> deleteCompany(String companyId) {
        ServiceResponse.ServiceResponseBuilder<Void> responseBuilder = ServiceResponse.builder();
        if (!ObjectId.isValid(companyId)) {
            responseBuilder.message("Invalid companyId");
            return responseBuilder.build();
        }
        ObjectId companyObjectId = new ObjectId(companyId);

        List<CentralControl> deletedCentralControls = centralControlRepository.deleteByCompanyId(companyObjectId);
        List<User> deletedUsers = userRepository.deleteByCompanyId(companyObjectId);
        List<PrayerConfig> deletedPrayerConfig = prayerConfigRepository.deleteByCompanyId(companyObjectId);

        boolean deletedRelatedObjects = (deletedCentralControls != null && !deletedCentralControls.isEmpty())
                ||  (deletedUsers != null && !deletedUsers.isEmpty())
                ||  (deletedPrayerConfig != null && !deletedPrayerConfig.isEmpty());


        if (companyRepository.existsById(companyId) && deletedRelatedObjects) {
            responseBuilder.successful(true);
            responseBuilder.message("Successfully deleted company");
            companyRepository.deleteById(companyId);
        } else {
            responseBuilder.message("Failed to delete company. Unable to find company.");
        }
        return responseBuilder.build();
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
