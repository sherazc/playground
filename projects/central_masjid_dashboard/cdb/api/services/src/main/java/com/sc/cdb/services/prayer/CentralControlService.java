package com.sc.cdb.services.prayer;

import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.CentralControlCompany;
import com.sc.cdb.services.model.ServiceResponse;

public interface CentralControlService {
    CentralControlCompany findByCompanyUrl(String url);

    ServiceResponse<String> save(CentralControl centralControl);
}
