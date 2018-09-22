package com.sc.cdb.webservices.controller;

import com.sc.cdb.services.CompanyService;
import com.sc.cdb.services.model.CompanyRegisterModel;
import com.sc.cdb.webservices.model.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController("company")
public class CompanyRegisterController {

    private CompanyService companyService;

    public CompanyRegisterController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping
    public ResponseEntity<Object> registerCompany(@Valid CompanyRegisterModel companyRegisterModel,
                                          BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // TODO: Create error response builder
            List<String> errors = bindingResult.getAllErrors().stream().map(e -> e.getObjectName() +  e.getDefaultMessage()).collect(Collectors.toList());
            return ResponseEntity.badRequest().body(new ErrorResponse("", errors));
        }

        CompanyRegisterModel result = companyService.registerCompany(companyRegisterModel);
        return ResponseEntity.ok(result);
    }
}
