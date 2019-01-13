package com.sc.cdb.services;

import com.sc.cdb.data.model.User;
import com.sc.cdb.data.model.UserCompany;
import com.sc.cdb.services.model.ServiceResponse;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findUserByEmail(String email);
    ServiceResponse<User> createOrUpdate(User user);
    List<UserCompany> findAllCompanyUsers(String companyId);
    Optional<User> findById(String userId);
    Optional<User> findCompanyUser(String companyId, String userId);
}
