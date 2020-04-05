package com.sc.cdb.data.repository;

import com.sc.cdb.data.model.auth.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmailIgnoreCase(String email);
    Optional<User> findByIdIsNotAndEmailIgnoreCase(String id, String email);
    List<User> findByCompanyId(ObjectId companyId);
    Optional<User> findByCompanyIdAndId(ObjectId companyId, ObjectId userId);

    @Query(value = "{'companyId': ?0}", count = true)
    Long countCompanyUsers(ObjectId companyId);

    List<User> deleteByCompanyId(ObjectId companyId);
}
