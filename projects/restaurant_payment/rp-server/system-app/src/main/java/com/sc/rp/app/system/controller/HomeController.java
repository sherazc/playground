package com.sc.rp.app.system.controller;

import java.util.List;

import com.sc.rp.data.system.entity.Company;
import com.sc.rp.data.system.repository.CompanyRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
    private CompanyRepository companyRepository;

    public HomeController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @GetMapping({"/", "/home"})
    public String home() {
        return "home";
    }

    @GetMapping({"/companies"})
    public @ResponseBody
    List<Company> getCompanies() {
        return companyRepository.findAll();
    }



}
