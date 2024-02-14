package com.sc.sb.auth.controller;

import com.sc.sb.auth.service.ScTokenGeneratorService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final ScTokenGeneratorService scTokenGeneratorService;

    public AuthController(ScTokenGeneratorService scTokenGeneratorService) {
        this.scTokenGeneratorService = scTokenGeneratorService;
    }

    @GetMapping("/token")
    public String token(Authentication authentication) {
        return scTokenGeneratorService.generateToken(authentication);
    }
}
