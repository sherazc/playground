package com.sc.cdb.webservices.controller;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.services.UserService;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.webservices.decorator.ErrorResponseDecorator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/auth/companies/{companyId}/users")
public class CompanyUserController {

    private UserService userService;
    private ErrorResponseDecorator errorResponseDecorator;

    public CompanyUserController(UserService userService, ErrorResponseDecorator errorResponseDecorator) {
        this.userService = userService;
        this.errorResponseDecorator = errorResponseDecorator;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllCompanyUsers(@PathVariable("companyId") String companyId) {
        return ResponseEntity.ok(userService.findAllCompanyUsers(companyId));
    }

    // TODO use company id
    @PostMapping
    public ResponseEntity<?> create(@PathVariable("companyId") String companyId, @Valid @RequestBody User user, BindingResult bindingResult) {
        ServiceResponse<Object> invalidResponse = ServiceResponse.builder().target(user).build();

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(
                    errorResponseDecorator.rejectBindingErrors(
                            invalidResponse,
                            bindingResult.getAllErrors()));
        }

        ServiceResponse<User> response = userService.createOrUpdate(user);
        if (response.isSuccessful()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // TODO create PUT and Delete mapping
}
