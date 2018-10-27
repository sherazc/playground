package com.sc.cdb.webservices.controller;

import com.sc.cdb.data.model.Address;
import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.services.CompanyService;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.webservices.decorator.ErrorResponseDecorator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.Date;

@RestController
@RequestMapping("/company")
public class CompanyController {

    private CompanyService companyService;
    private PasswordEncoder passwordEncoder;
    private ErrorResponseDecorator errorResponseDecorator;

    public CompanyController(
            CompanyService companyService,
            PasswordEncoder passwordEncoder,
            ErrorResponseDecorator errorResponseDecorator) {
        this.companyService = companyService;
        this.passwordEncoder = passwordEncoder;
        this.errorResponseDecorator = errorResponseDecorator;
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Company company, BindingResult bindingResult) {
        ServiceResponse<Object> invalidResponse = ServiceResponse.builder().target(company).build();

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(
                    errorResponseDecorator.rejectBindingErrors(
                            invalidResponse,
                            bindingResult.getAllErrors()));
        }

        ServiceResponse<Company> response = companyService.createOrUpdate(company);
        if (response.isSuccessful()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // TODO: delete it once this example is not needed anymore
    @GetMapping("secure")
    @PreAuthorize("hasRole('USER')")
    @Deprecated
    public ResponseEntity<Object> getCompanyById() {
        Address address = new Address("123 St", "City", "ST", "12345", "1.1", "2.2");
        Company company = new Company("xyz.abc", "Company Name", address,true, new Date());
        User user = new User(
                "abc.xyz",
                "xyz.abc",
                "email@email.com",
                "password",
                "First",
                "Last",
                Arrays.asList("USER"),
                true, true
        );
        // CompanyRegisterModelDeprecated companyRegisterModel = new CompanyRegisterModelDeprecated(company, user);
        return ResponseEntity.ok("Works");
    }

    // TODO: delete it once this example is not needed anymore
    @GetMapping("open")
    @PreAuthorize("permitAll()")
    @Deprecated
    public ResponseEntity<Object> getCompanyById2() {
        Address address = new Address("123 St", "City", "ST", "12345", "1.1", "2.2");
        Company company = new Company("xyz.abc", "Company Name", address, true, new Date());
        User user = new User(
                "abc.xyz",
                "xyz.abc",
                "email@email.com",
                "password",
                "First",
                "Last",
                Arrays.asList("USER"),
                true, true
        );
        // CompanyRegisterModelDeprecated companyRegisterModel = new CompanyRegisterModelDeprecated(company, user);
        return ResponseEntity.ok("Works");
    }
}
