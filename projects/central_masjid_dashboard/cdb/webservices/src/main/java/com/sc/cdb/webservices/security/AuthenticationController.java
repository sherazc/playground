package com.sc.cdb.webservices.security;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.services.CompanyService;
import com.sc.cdb.webservices.model.AuthenticatedUserDetail;
import com.sc.cdb.webservices.model.AuthenticationRequest;
import com.sc.cdb.webservices.model.AuthenticationResponse;
import org.apache.commons.lang3.StringUtils;
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

        AuthenticationResponse authenticationResponse = null;

        if (authentication.isAuthenticated()) {
            AuthenticatedUserDetail authenticatedUserDetail = (AuthenticatedUserDetail) authentication.getPrincipal();
            User user = authenticatedUserDetail.getUser();
            if (user != null) {
                Map<String, Object> claims = new HashMap<>();
                boolean assumeUserCompany = false;
                if (user.getRoles() != null) {
                    claims.put("roles", user.getRoles());
                    assumeUserCompany = user.getRoles().contains("SUPER_ADMIN");
                }

                Company company = getUsersCompany(
                        user.getCompanyId(),
                        authenticationRequest.getCompanyId(),
                        assumeUserCompany);
                // Checking if SUPER_ADMIN is trying to assume an
                /*
                if (StringUtils.isNotBlank(user.getCompanyId())) {
                    LOG.debug("Authenticated user by email {}. Now searching for user's company {}",
                            user.getEmail(),
                            user.getCompanyId());
                    companyService.findCompanyById()
                } else {
                    LOG.info("Authenticated user by email {}. But user is not assigned companyId",
                            user.getEmail());

                }
                */


                Company company = authenticatedUserDetail.getCompany();

                String token = this.authenticationTokenService.generateToken(user.getEmail(), claims);
                authenticationResponse.setToken(token);
                authenticationResponse.setUser(user);
                authenticationResponse.setCompany(company);
            }
        }
        return ResponseEntity.ok(authenticationResponse);
    }
}
