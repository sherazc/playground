package com.sc.kafka04.repository;

import com.sc.kafka04.entity.RegisterUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisterUserRepo extends JpaRepository<Long, RegisterUser> {
}
