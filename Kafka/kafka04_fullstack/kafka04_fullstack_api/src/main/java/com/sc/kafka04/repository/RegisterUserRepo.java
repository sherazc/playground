package com.sc.kafka04.repository;

import com.sc.kafka04.entity.RegisterUser;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface RegisterUserRepo extends CrudRepository<RegisterUser, Long> {
  Optional<RegisterUser> findByUserName(String username);
  List<RegisterUser> findByEmail(String email);

}
