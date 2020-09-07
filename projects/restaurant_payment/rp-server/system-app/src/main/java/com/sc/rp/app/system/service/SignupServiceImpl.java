package com.sc.rp.app.system.service;

import com.sc.rp.app.system.model.SignupRequest;
import com.sc.rp.app.system.model.SignupResponse;
import com.sc.rp.data.system.repository.CompanyRepository;
import com.sc.rp.data.system.repository.CompanyUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class SignupServiceImpl implements SignupService {

    private CompanyRepository companyRepository;
    private CompanyUserRepository companyUserRepository;

    @Override
    public SignupResponse signup(SignupRequest request) {
        return null;
    }
}
