package com.sc.kafka04.controller;

import com.sc.kafka04.entity.RegisterRole;
import com.sc.kafka04.repository.RegisterRoleRepo;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/register/roles")
@AllArgsConstructor
public class RegisterRoleController {
  private final RegisterRoleRepo registerRoleRepo;

  @GetMapping
  public List<RegisterRole> getAllRoles() {
    return StreamSupport.stream(registerRoleRepo.findAll().spliterator(), false).toList();
  }
}
