package com.sc.controller;

import com.sc.modal.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user-order")
public class UserOrderController {

    @PutMapping
    public ResponseEntity<Boolean> addUser(@RequestBody User user) {
        return ResponseEntity.ok(true);
    }
}
