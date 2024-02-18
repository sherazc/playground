package com.sc.sb.auth.controller;

import com.sc.sb.auth.service.ScTokenGeneratorService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpHeaders;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final ScTokenGeneratorService scTokenGeneratorService;

    public AuthController(ScTokenGeneratorService scTokenGeneratorService) {
        this.scTokenGeneratorService = scTokenGeneratorService;
    }

    @GetMapping("/token")
    @PreAuthorize("hasRole('USER')")
    public String token(Authentication authentication, @RequestParam String[] requestedScopes) {
        return scTokenGeneratorService.generateToken(authentication, requestedScopes);
    }
}
