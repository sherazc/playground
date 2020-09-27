package com.sc.cdb.services.version;

import java.util.List;
import java.util.Optional;

import com.sc.cdb.data.model.version.CompanyDataVersion;
import com.sc.cdb.data.model.version.CompanyListVersion;
import com.sc.cdb.data.repository.CompanyDataVersionRepository;
import com.sc.cdb.data.repository.CompanyListVersionRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@AllArgsConstructor
public class DbVersionServiceImpl implements DbVersionService {

    private CompanyListVersionRepository companyListVersionRepository;
    private CompanyDataVersionRepository companyDataVersionRepository;

    @Override
    public CompanyListVersion upgradeCompanyListVersion() {
        CompanyListVersion companyListVersion = this.getCompanyListVersion();
        long upgradedVersion = companyListVersion.getVersion() + 1;
        log.debug("Upgrading companyListVersion. Upgraded version = {}", upgradedVersion);
        companyListVersion.setVersion(upgradedVersion);
        return companyListVersionRepository.save(companyListVersion);
    }

    @Override
    public CompanyListVersion getCompanyListVersion() {
        CompanyListVersion companyListVersion;
        List<CompanyListVersion> companyListVersions = companyListVersionRepository.findAll();

        if (companyListVersions.isEmpty()) {
            CompanyListVersion newCompanyListVersion = new CompanyListVersion();
            newCompanyListVersion.setVersion(0L);
            companyListVersion = companyListVersionRepository.save(newCompanyListVersion);
        } else {
            companyListVersion = companyListVersions.get(0);
            if (companyListVersion.getVersion() == null) {
                companyListVersion.setVersion(0L);
                companyListVersionRepository.save(companyListVersion);
            }
        }

        return companyListVersion;
    }

    @Override
    public CompanyDataVersion upgradeCompanyDataVersion(String companyId) {
        CompanyDataVersion companyDataVersion = this.getCompanyDataVersion(companyId);
        if (companyDataVersion == null) {
            return null;
        }
        long upgradedVersion = companyDataVersion.getVersion() + 1;
        companyDataVersion.setVersion(upgradedVersion);
        log.debug("Upgrading companyDataVersion. companyId {}, Upgraded version = {}", companyId, upgradedVersion);
        return companyDataVersionRepository.save(companyDataVersion);
    }

    @Override
    public CompanyDataVersion getCompanyDataVersion(String companyId) {
        if (!ObjectId.isValid(companyId)) {
            return null;
        }
        ObjectId companyObjectId = new ObjectId(companyId);

        CompanyDataVersion companyDataVersion;
        Optional<CompanyDataVersion> companyDataVersionOptional = companyDataVersionRepository.findByCompanyId(companyObjectId);

        if (companyDataVersionOptional.isEmpty()) {
            CompanyDataVersion newCompanyDataVersion = new CompanyDataVersion();
            newCompanyDataVersion.setVersion(0L);
            newCompanyDataVersion.setCompanyId(companyId);
            companyDataVersion = companyDataVersionRepository.save(newCompanyDataVersion);
        } else {
            companyDataVersion = companyDataVersionOptional.get();
            if (companyDataVersion.getVersion() == null) {
                companyDataVersion.setVersion(0L);
                companyDataVersionRepository.save(companyDataVersion);
            }
        }

        return companyDataVersion;
    }
}
