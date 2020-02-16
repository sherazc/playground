package com.sc.cdb.webservices.auth.controller;

import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.services.auth.UserService;
import com.sc.cdb.services.model.ServiceResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/auth/users")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("{userId}/verifyEmail/{emailVerifyCode}")
    public ResponseEntity<ServiceResponse<User>> verifyEmail(
            @PathVariable String userId, @PathVariable String emailVerifyCode) {
        log.debug("Verifying email. userId={}, emailVerifyCode={}", userId, emailVerifyCode);
        ServiceResponse<User> serviceResponse = userService.verifyEmail(userId, emailVerifyCode);
        return ResponseEntity.ok(serviceResponse);
    }

    @GetMapping("{userId}/activate")
    public ResponseEntity<ServiceResponse<User>> activateUser(
            @PathVariable String userId, @RequestParam boolean active) {
        log.debug("Activating User. userId={}, active={}", userId, active);
        ServiceResponse<User> serviceResponse = userService.activateUser(userId, active);
        return ResponseEntity.ok(serviceResponse);
    }


}
