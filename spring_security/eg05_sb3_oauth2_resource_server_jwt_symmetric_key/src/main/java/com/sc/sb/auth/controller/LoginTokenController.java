package com.sc.sb.auth.controller;

import com.sc.sb.auth.service.ScTokenGeneratorService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/**
 * Login endpoint. Successful response is a JWT token
 */
@RestController
@RequestMapping("/login")
public class LoginTokenController {
    private final ScTokenGeneratorService scTokenGeneratorService;

    public LoginTokenController(ScTokenGeneratorService scTokenGeneratorService) {
        this.scTokenGeneratorService = scTokenGeneratorService;
    }


    /**
     * Login endpoint.
     *
     * @param authentication Successfully logged-in user. Used for generating token.
     * @param requestedScopes It's a good practice to only populate JWT with scopes that login requested for.
     *                        Do not populate JWT with all the roles and authorities.
     * @return JWT
     */
    @GetMapping("/token")
    // Custom business logic to only let user use this endpoint who have ROLE_USER
    @PreAuthorize("hasRole('USER')")
    public String token(Authentication authentication, @RequestParam String[] requestedScopes) {
        return scTokenGeneratorService.generateToken(authentication, requestedScopes);
    }
}
