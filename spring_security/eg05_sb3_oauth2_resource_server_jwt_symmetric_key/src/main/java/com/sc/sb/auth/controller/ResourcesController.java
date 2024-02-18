package com.sc.sb.auth.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Contains different resource that require different set of roles & authorities.
 */
@RestController
public class ResourcesController {

    @GetMapping("/admin_user_read_write")
    @PreAuthorize("hasRole('USER') and hasRole('ADMIN') and hasAuthority('READ') and hasAuthority('WRITE')")
    public String admin_user_read_write(Authentication authentication) {
        return "admin_user_read_write = " + authentication.getName();
    }

    @GetMapping("/user_read_write")
    @PreAuthorize("hasRole('USER') and hasAuthority('READ') and hasAuthority('WRITE')")
    public String user_read_write(Authentication authentication) {
        return "user_read_write = " + authentication.getName();
    }

    @GetMapping("/user_read")
    @PreAuthorize("hasRole('USER') and hasAuthority('READ')")
    public String user_read(Authentication authentication) {
        return "user_read = " + authentication.getName();
    }
}
