package com.sc.cdb.services.auth;

import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.services.model.ServiceResponse;

import java.util.Optional;

public interface UserService {
    Optional<User> findUserByEmail(String email);
    ServiceResponse<User> createOrUpdate(User user);

    Optional<User> findCompanyUser(String companyId, String userId);
    ServiceResponse<User> verifyEmail(String userId, String emailVerifyCode);

    ServiceResponse<User> activateUser(String userId, boolean active);
}
