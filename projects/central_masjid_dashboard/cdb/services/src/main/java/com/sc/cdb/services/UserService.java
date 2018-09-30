package com.sc.cdb.services;

import com.sc.cdb.data.model.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findUserByEmail(String email);
}
