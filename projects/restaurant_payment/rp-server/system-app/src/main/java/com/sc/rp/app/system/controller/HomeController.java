package com.sc.rp.app.system.controller;

import java.util.List;

import com.sc.rp.data.customer.entity.Customer;
import com.sc.rp.data.customer.repository.CustomerRepository;
import com.sc.rp.data.system.entity.Company;
import com.sc.rp.data.system.repository.CompanyRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
    private CompanyRepository companyRepository;
    private CustomerRepository customerRepository;

    public HomeController(CompanyRepository companyRepository, CustomerRepository customerRepository) {
        this.companyRepository = companyRepository;
        this.customerRepository = customerRepository;
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

    @GetMapping({"/customers"})
    public @ResponseBody
    List<Customer> getCustomers() {
        return customerRepository.findAll();
    }
}
