package com.sc.cdb.data.repository;

import com.sc.cdb.data.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
