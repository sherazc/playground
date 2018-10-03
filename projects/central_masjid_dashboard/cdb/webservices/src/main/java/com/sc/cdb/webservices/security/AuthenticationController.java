package com.sc.cdb.webservices.security;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.services.CompanyService;
import com.sc.cdb.webservices.model.AuthenticatedUserDetail;
import com.sc.cdb.webservices.model.AuthenticationRequest;
import com.sc.cdb.webservices.model.AuthenticationResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationController.class);

    private AuthenticationManager authenticationManager;
    private AuthenticationTokenService authenticationTokenService;
    private CompanyService companyService;

    @Autowired
    public AuthenticationController(
            AuthenticationManager authenticationManager,
            AuthenticationTokenService authenticationTokenService) {
        this.authenticationManager = authenticationManager;
        this.authenticationTokenService = authenticationTokenService;
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthenticationRequest authenticationRequest) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getEmail(),
                        authenticationRequest.getPassword()
                )
        );

        AuthenticationResponse authenticationResponse = new AuthenticationResponse();

        if (authentication.isAuthenticated()) {
            AuthenticatedUserDetail authenticatedUserDetail = (AuthenticatedUserDetail) authentication.getPrincipal();
            User user = authenticatedUserDetail.getUser();
            Map<String, Object> claims = new HashMap<>();
            if (user.getRoles() != null) {
                claims.put("roles", user.getRoles());
            }
            Company company = authenticatedUserDetail.getCompany();

            String token = this.authenticationTokenService.generateToken(user.getEmail(), claims);
            authenticationResponse.setToken(token);
            authenticationResponse.setUser(user);
            authenticationResponse.setCompany(company);
        }
        return ResponseEntity.ok(authenticationResponse);
    }
}
