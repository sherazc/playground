package com.sc.cdb.webservices.auth.controller;

import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.services.auth.CompanyAuthService;
import com.sc.cdb.services.auth.UserService;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.webservices.decorator.ErrorResponseDecorator;
import lombok.AllArgsConstructor;
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
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.text.MessageFormat;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth/companies/{companyId}/users")
@AllArgsConstructor
public class CompanyUserController {
    private static final Logger LOG = LoggerFactory.getLogger(CompanyUserController.class);

    private final CompanyAuthService companyAuthService;
    private final UserService userService;
    private final ErrorResponseDecorator errorResponseDecorator;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> getAllCompanyUsers(@PathVariable("companyId") String companyId) {
        return ResponseEntity.ok(companyAuthService.findCompanyUsersByCompanyId(companyId));
    }

    @GetMapping("{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> getAllCompanyUser(
            @PathVariable("companyId") String companyId,
            @PathVariable("userId") String userId) {
        Optional<User> userOptional = userService.findCompanyUser(companyId, userId);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    // @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> createOrUpdate(
            @PathVariable("companyId") String companyId,
            @Valid @RequestBody User user,
            BindingResult bindingResult) {
        ServiceResponse<Object> invalidResponse = ServiceResponse.builder().target(user).build();

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(
                    errorResponseDecorator.rejectBindingErrors(
                            invalidResponse,
                            bindingResult.getAllErrors()));
        }
        user.setCompanyId(companyId);

        ServiceResponse<User> response = userService.createOrUpdate(user);
        if (response.isSuccessful()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> update(
            @PathVariable("companyId") String companyId,
            @PathVariable("userId") String userId,
            @Valid @RequestBody User user, BindingResult bindingResult) {
        ServiceResponse.ServiceResponseBuilder<Object> invalidResponseBuilder = ServiceResponse.builder().target(user);

        Optional<User> userOptional = userService.findCompanyUser(companyId, userId);
        if (!userOptional.isPresent()) {
            String errorMessage = MessageFormat.format("Can not update user. UserId {0} not found.", userId);
            LOG.error(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    invalidResponseBuilder.message(errorMessage).build());
        }

        if (StringUtils.isBlank(user.getPassword())) {
            user.setPassword(userOptional.get().getPassword());
        }

        return this.createOrUpdate(companyId, user, bindingResult);
    }

    @DeleteMapping("{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable("companyId") String companyId, @PathVariable("id") String id) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Delete method not implemented yet. ID " + id);
    }

}
