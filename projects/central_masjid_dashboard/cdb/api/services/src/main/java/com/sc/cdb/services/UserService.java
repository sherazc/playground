package com.sc.cdb.services;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.services.model.ServiceResponse;

import java.util.Optional;

public interface UserService {
    Optional<User> findUserByEmail(String email);
    ServiceResponse<User> createOrUpdate(User user);
}
