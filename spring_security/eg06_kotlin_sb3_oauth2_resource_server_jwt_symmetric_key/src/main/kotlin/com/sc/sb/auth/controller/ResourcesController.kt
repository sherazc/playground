package com.sc.sb.auth.controller

import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ResourcesController {
    @GetMapping("/admin_user_read_write")
    @PreAuthorize("hasRole('USER') and hasRole('ADMIN') and hasAuthority('READ') and hasAuthority('WRITE')")
    fun admin_user_read_write(authentication: Authentication) = "admin_user_read_write = ${authentication.name}"


    @GetMapping("/user_read_write")
    @PreAuthorize("hasRole('USER') and hasAuthority('READ') and hasAuthority('WRITE')")
    fun user_read_write(authentication: Authentication) = "user_read_write = ${authentication.name}"


    @GetMapping("/user_read")
    @PreAuthorize("hasRole('USER') and hasAuthority('READ')")
    fun user_read(authentication: Authentication) = "user_read = ${authentication.name}"

}