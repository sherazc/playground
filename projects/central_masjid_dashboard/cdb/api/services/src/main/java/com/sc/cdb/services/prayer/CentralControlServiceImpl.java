package com.sc.cdb.services.prayer;

import java.util.List;

import com.sc.cdb.data.dao.CentralControlDao;
import com.sc.cdb.data.model.cc.CentralControlCompany;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Service
public class CentralControlServiceImpl implements CentralControlService {
  private CentralControlDao centralControlDao;

  public CentralControlServiceImpl(CentralControlDao centralControlDao) {
    this.centralControlDao = centralControlDao;
  }

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

}
