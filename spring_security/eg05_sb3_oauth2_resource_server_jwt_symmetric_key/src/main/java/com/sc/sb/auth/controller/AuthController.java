package com.sc.sb.auth.controller;

import com.sc.sb.auth.service.TokenService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final TokenService tokenService;

    public AuthController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @GetMapping("/token")
    public String token(Authentication authentication) {
        return tokenService.generateToken(authentication);
    }
}
