package com.sc.cdb.webservices.auth.security;

import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.services.auth.CompanyService;
import com.sc.cdb.webservices.auth.model.AuthenticatedUserDetail;
import com.sc.cdb.webservices.auth.model.AuthenticationRequest;
import com.sc.cdb.webservices.auth.model.AuthenticationResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private static final Logger LOG = LoggerFactory.getLogger(AuthenticationController.class);

    private AuthenticationManager authenticationManager;
    private AuthenticationTokenService authenticationTokenService;
    private CompanyService companyService;

    public AuthenticationController(
            AuthenticationManager authenticationManager,
            AuthenticationTokenService authenticationTokenService,
            CompanyService companyService) {
        this.authenticationManager = authenticationManager;
        this.authenticationTokenService = authenticationTokenService;
        this.companyService = companyService;
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
            authenticationResponse = buildAuthenticationResponse(
                    authenticatedUserDetail.getUser(),
                    authenticationRequest.getCompanyId());
        }

        if (authenticationResponse == null) {
            return ResponseEntity.status(401).build();
        } else {
            return ResponseEntity.ok(authenticationResponse);
        }
    }

    private AuthenticationResponse buildAuthenticationResponse(User user, String requestedCompanyId) {
        if (user == null) {
            LOG.warn("Not building authentication response. User is null.");
            return null;
        }
        AuthenticationResponse authenticationResponse = null;
        Map<String, Object> claims = createClaims(user.getRoles());

        Company company = getUserCompanyOrAssumedCompany(user.getRoles(),
                user.getCompanyId(), requestedCompanyId);

        if (company == null) {
            LOG.warn("Can not authenticate. Unable to find company.");
        } else {
            authenticationResponse = new AuthenticationResponse();
            String token = this.authenticationTokenService.generateToken(user.getEmail(), claims);
            authenticationResponse.setToken(token);
            authenticationResponse.setUser(user);
            authenticationResponse.setCompany(company);
        }

        return authenticationResponse;
    }


    private Map<String, Object> createClaims(List<String> userRoles) {
        Map<String, Object> claims = new HashMap<>();
        if (userRoles != null) {
            claims.put("roles", userRoles);
        }
        return claims;
    }

    private Company getUserCompanyOrAssumedCompany(List<String> userRoles, String userCompanyId, String assumeCompanyId) {
        boolean superAdminUser = userRoles != null && userRoles.contains("SUPER_ADMIN");
        LOG.debug("Searching for user's company. superAdminUser={}, userCompanyId={}, assumeCompanyId={}",
                superAdminUser, userCompanyId, assumeCompanyId);

        String companyIdToWorkWith = superAdminUser && StringUtils.isNotBlank(assumeCompanyId) ? assumeCompanyId : userCompanyId;
        if (StringUtils.isBlank(companyIdToWorkWith)) {
            LOG.warn(
                    "Can not find company. Company ID not provided. superAdminUser={}, userCompanyId={}, assumeCompanyId={}",
                    superAdminUser, userCompanyId, assumeCompanyId);
            return null;
        }
        return companyService.findCompanyById(companyIdToWorkWith).orElse(null);
    }
}
