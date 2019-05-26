package com.sc.cdb.services.prayer;

import com.sc.cdb.data.model.cc.CentralControlCompany;
import org.springframework.stereotype.Service;

public interface CentralControlService {
  CentralControlCompany findByCompanyUrl(String url);
}
