package com.sc.cdb.webservices.controller;

import com.sc.cdb.data.model.Address;
import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.services.CompanyService;
import com.sc.cdb.services.model.CompanyRegisterModel;
import com.sc.cdb.webservices.model.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController("company")
public class CompanyRegisterController {

    private CompanyService companyService;

    public CompanyRegisterController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public ResponseEntity<Object> registerCompany(
            @Valid @RequestBody CompanyRegisterModel companyRegisterModel,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(new ErrorResponse("400", bindingResult));
        }

        CompanyRegisterModel result = companyService.registerCompany(companyRegisterModel);
        return ResponseEntity.ok(result);
    }

    @GetMapping
    public ResponseEntity<Object> getCompanyById() {
        Address address = new Address("123 St", "City", "ST", "12345", "1.1", "2.2");
        Company company = new Company("xyz.abc", "Company Name", address, "icon");
        User user = new User(
                "abc.xyz",
                "xyz.abc",
                "email@email.com",
                "password",
                "First",
                "Last",
                true,
                new String[]{"USER"}
                );
        CompanyRegisterModel companyRegisterModel = new CompanyRegisterModel(company, user);
        return ResponseEntity.ok(companyRegisterModel);
    }
}
