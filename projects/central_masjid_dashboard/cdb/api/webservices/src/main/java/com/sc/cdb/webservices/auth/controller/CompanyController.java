package com.sc.cdb.webservices.auth.controller;

import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.cc.CustomConfiguration;
import com.sc.cdb.services.auth.CompanyService;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.webservices.decorator.ErrorResponseDecorator;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api/auth/companies")
public class CompanyController {
    private static final Logger LOG = LoggerFactory.getLogger(CompanyController.class);

    private CompanyService companyService;
    private ErrorResponseDecorator errorResponseDecorator;

    public CompanyController(
            CompanyService companyService,
            ErrorResponseDecorator errorResponseDecorator) {
        this.companyService = companyService;
        this.errorResponseDecorator = errorResponseDecorator;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN')")
    public ResponseEntity<List<Company>> getAllCompanies() {
        return ResponseEntity.ok(companyService.findAll());
    }

    @GetMapping("active")
    public ResponseEntity<List<Company>> getAllActiveCompanies() {
        return ResponseEntity.ok(companyService.findAllActive());
    }

    @GetMapping("{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable("id") String id) {
        Optional<Company> companyOptional = companyService.findCompanyById(id);
        if (companyOptional.isPresent()) {
            return ResponseEntity.ok(companyOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> update(@Valid @RequestBody Company company, @PathVariable("id") String id, BindingResult bindingResult) {
        ServiceResponse.ServiceResponseBuilder<Object> invalidResponseBuilder = ServiceResponse.builder().target(company);

        if (StringUtils.isBlank(id)) {
            String errorMessage = MessageFormat.format("Can not update company. Bad companyId {0}.", id);
            LOG.error(errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    invalidResponseBuilder.message(errorMessage).build());
        }

        Optional<Company> companyOptional = companyService.findCompanyById(id);
        if (!companyOptional.isPresent()) {
            String errorMessage = MessageFormat.format("Can not update company. CompanyId {0} not found.", id);
            LOG.error(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    invalidResponseBuilder.message(errorMessage).build());
        }

        if (company != null) {
            company.setId(id);
        }

        return this.createOrUpdate(company, bindingResult);
    }

    @PostMapping
    // @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> createOrUpdate(@Valid @RequestBody Company company, BindingResult bindingResult) {
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

    /**
     * @deprecated use getAllActiveCompanies() instead
     * @return
     */
    @Deprecated
    @GetMapping("/url/active")
    public ResponseEntity<List<Company>> findAllActiveCompanyUrl() {
        return ResponseEntity.ok(this.companyService.findAllActiveCompanyUrl());
    }

    /**
     * @deprecated use getAllCompanies() instead
     * @return
     */
    @Deprecated
    @GetMapping("/url")
    public ResponseEntity<List<Company>> findAllCompanyUrl() {
        return ResponseEntity.ok(this.companyService.findAllCompanyUrl());
    }

    @GetMapping("{companyId}/configurations")
    public ResponseEntity<List<CustomConfiguration>> getCompanyConfigurations(@PathVariable String companyId) {
        return ResponseEntity.ok(this.companyService.findCompanyConfigurations(companyId));
    }

    @GetMapping("{companyId}/activate")
    public ResponseEntity<ServiceResponse<Company>> activateCompany(
            @PathVariable String companyId, @RequestParam boolean active) {
        log.debug("Activating Company. companyId={}, active={}", companyId, active);
        ServiceResponse<Company> serviceResponse = companyService.activateCompany(companyId, active);
        return ResponseEntity.ok(serviceResponse);
    }

    @DeleteMapping("{companyId}")
    public ResponseEntity<ServiceResponse<Void>> deleteCompany(@PathVariable String companyId) {
        log.debug("Deleting Company. companyId={}", companyId);
        ServiceResponse<Void> serviceResponse = companyService.deleteCompany(companyId);
        return ResponseEntity.ok(serviceResponse);
    }
}
