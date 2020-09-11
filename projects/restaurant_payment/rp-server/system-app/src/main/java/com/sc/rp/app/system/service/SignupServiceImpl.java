package com.sc.rp.app.system.service;

import javax.validation.Valid;

import com.sc.rp.app.system.model.SignupRequest;
import com.sc.rp.app.system.model.SignupResponse;
import com.sc.rp.data.system.entity.Bank;
import com.sc.rp.data.system.entity.Company;
import com.sc.rp.data.system.entity.CompanyUser;
import com.sc.rp.data.system.repository.BankRepository;
import com.sc.rp.data.system.repository.CompanyRepository;
import com.sc.rp.data.system.repository.CompanyUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@AllArgsConstructor
public class SignupServiceImpl implements SignupService {

    private CompanyRepository companyRepository;
    private CompanyUserRepository companyUserRepository;
    private BankRepository bankRepository;

    @Override
    @Transactional
    public SignupResponse signup(SignupRequest request) {

        Company company = companyRepository.save(request.getCompany());
        request.getCompanyUser().setCompany(company);
        CompanyUser companyUser = companyUserRepository.save(request.getCompanyUser());
        request.getBank().setActive(true);
        request.getBank().setCompany(company);
        Bank bank = bankRepository.save(request.getBank());


        SignupResponse signupResponse = new SignupResponse();
        signupResponse.setCompany(company);
        signupResponse.setCompanyUser(companyUser);
        signupResponse.setBank(bank);

        return signupResponse;
    }
}
