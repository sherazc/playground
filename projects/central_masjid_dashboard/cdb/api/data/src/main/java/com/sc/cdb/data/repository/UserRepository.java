package com.sc.cdb.data.repository;

import com.sc.cdb.data.model.auth.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmailIgnoreCase(String email);
    Optional<User> findByIdIsNotAndEmailIgnoreCase(String id, String email);
    List<User> findByCompanyId(String companyId);
    Optional<User> findByCompanyIdAndId(String companyId, String userId);
}
