package com.sc.react.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserApi {

    private static List<User> users = new ArrayList<>();

    static {
        users.add(new User(1,"User a", 10));
        users.add(new User(2,"User b", 20));
    }

    @GetMapping
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<?> addUser(@RequestBody User user) {
        user.setId(users.size() + 10);
        users.add(user);
        return ResponseEntity.ok(users);
    }
}
