package com.sc.cdb.services.prayer;

import java.util.List;

import com.sc.cdb.data.dao.CentralControlDao;
import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.CentralControlCompany;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.version.DbVersionService;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CentralControlServiceImpl implements CentralControlService {
    private CentralControlDao centralControlDao;
    private DbVersionService dbVersionService;

    public CentralControlCompany findByCompanyUrl(String url) {
        if (StringUtils.isBlank(url)) {
            return null;
        }
        List<CentralControlCompany> centralControlCompanies = this.centralControlDao.findByCompanyUrl(url);

        if (centralControlCompanies == null || centralControlCompanies.isEmpty()) {
            return null;
        } else {
            return centralControlCompanies.get(0);
        }
    }

    @Override
    public ServiceResponse<String> save(CentralControl centralControl) {
        ServiceResponse.ServiceResponseBuilder<String> serviceResponseBuilder = ServiceResponse.builder();

        if (centralControl == null || StringUtils.isBlank(centralControl.getCompanyId())) {
            serviceResponseBuilder.successful(false).message("Invalid CentralControl provided to save");
        }

        CentralControl savedCentralControl = this.centralControlDao.save(centralControl);

        if (StringUtils.isBlank(savedCentralControl.getId())) {
            serviceResponseBuilder.successful(false).message("Failed to save CentralControl");
        } else {
            if (StringUtils.isNotBlank(centralControl.getCompanyId())) {
                dbVersionService.upgradeCompanyDataVersion(centralControl.getCompanyId());
            }
            serviceResponseBuilder
                    .successful(true)
                    .message("Successfully saved CentralControl")
                    .target(savedCentralControl.getId());
        }

        return serviceResponseBuilder.build();
    }
}
