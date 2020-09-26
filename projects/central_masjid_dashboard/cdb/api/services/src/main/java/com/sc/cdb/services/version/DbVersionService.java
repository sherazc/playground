package com.sc.cdb.services.version;

import com.sc.cdb.data.model.version.CompanyDataVersion;
import com.sc.cdb.data.model.version.CompanyListVersion;

public interface DbVersionService {
    CompanyDataVersion upgradeCompanyDataVersion(String companyId);
    CompanyDataVersion getCompanyDataVersion(String companyId);

    CompanyListVersion upgradeCompanyListVersion();
    CompanyListVersion getCompanyListVersion();
}
