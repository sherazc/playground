package com.sc.sb.auth.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/admin_user_read_write")
    public String admin_user_read_write(Authentication authentication) {
        return "admin_user_read_write = " + authentication.getName();
    }

    @GetMapping("/user_read_write")
    public String user_read_write(Authentication authentication) {
        return "admin_user_read_write = " + authentication.getName();
    }

    @GetMapping("/user_read")
    public String user_read(Authentication authentication) {
        return "user_read = " + authentication.getName();
    }
}
