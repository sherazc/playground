package com.sc.cdb.webservices.auth.controller;

import com.sc.cdb.services.auth.UserService;
import com.sc.cdb.services.model.ServiceResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<ServiceResponse<Boolean>> verifyEmail(
            @PathVariable String userId, @PathVariable String emailVerifyCode) {
        log.debug("Verifying email. userId={}, emailVerifyCode={}", userId, emailVerifyCode);
        ServiceResponse<Boolean> serviceResponse = userService.verifyEmail(userId, emailVerifyCode);
        return ResponseEntity.ok(serviceResponse);
    }

}
