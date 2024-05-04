package com.sc.cdb.services.auth;

import com.sc.cdb.data.dao.CompanyDao;
import com.sc.cdb.data.model.auth.CompanyUsers;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CompanyAuthServiceImpl implements CompanyAuthService {
    private CompanyDao companyDao;

    @Override
    public List<CompanyUsers> findCompanyUsersByCompanyId(String companyId) {
        if (companyId == null || companyId.isEmpty()) return List.of();
        if ("all".equals(companyId)) {
            return companyDao.findAllCompanyUsers();
        } else {
            return companyDao.findCompanyUsersByCompanyId(companyId);
        }
    }
}
