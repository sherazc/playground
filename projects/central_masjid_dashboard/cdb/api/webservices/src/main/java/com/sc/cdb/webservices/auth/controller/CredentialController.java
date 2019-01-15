package com.sc.cdb.webservices.auth.controller;

import com.sc.cdb.data.model.auth.Credential;
import com.sc.cdb.services.auth.UserCredentialService;
import com.sc.cdb.services.model.ServiceResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/credential")
public class CredentialController {

    private UserCredentialService userCredentialService;

    public CredentialController(UserCredentialService userCredentialService) {
        this.userCredentialService = userCredentialService;
    }

    @PutMapping("reset/user/{email}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<Object> reset(
            @PathVariable("email") String email, @RequestBody Credential credential) {
        credential.setEmail(email);
        ServiceResponse<Boolean> response = userCredentialService.reset(credential);
        if (response.isSuccessful()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("update/user/{email}")
    @PreAuthorize("isAuthenticated()")
    // @Secured("IS_AUTHENTICATED_FULLY")
    public ResponseEntity<Object> update(
            @PathVariable("email") String email, @RequestBody Credential credential) {
        credential.setEmail(email);
        ServiceResponse<Boolean> response = userCredentialService.update(credential);
        if (response.isSuccessful()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
