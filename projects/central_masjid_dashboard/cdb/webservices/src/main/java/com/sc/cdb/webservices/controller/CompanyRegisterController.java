package com.sc.cdb.webservices.controller;

import com.sc.cdb.services.CompanyService;
import com.sc.cdb.services.model.CompanyRegisterModel;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("company")
public class CompanyRegisterController {

    private CompanyService companyService;

    public CompanyRegisterController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public CompanyRegisterModel registerCompany(CompanyRegisterModel companyRegisterModel) {
        return companyService.registerCompany(companyRegisterModel);
    }
}
