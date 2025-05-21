package com.sc.kafka04.repository;

import com.sc.kafka04.entity.RegisterUser;
import org.springframework.data.repository.CrudRepository;

public interface RegisterUserRepo extends CrudRepository<RegisterUser, Long> {
}
