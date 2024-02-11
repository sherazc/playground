package com.sc.sb.auth.repository;

import com.sc.sb.auth.entity.ScUser;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ScUserRepository extends CrudRepository<ScUser, Long> {
    Optional<ScUser> findByUserNameIgnoreCase(String userName);
}
