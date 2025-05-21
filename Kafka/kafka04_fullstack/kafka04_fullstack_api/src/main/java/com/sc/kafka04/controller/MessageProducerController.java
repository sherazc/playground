package com.sc.kafka04.controller;

import com.sc.kafka04.entity.RegisterUser;
import com.sc.kafka04.repository.RegisterUserRepo;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/message-producer")
@AllArgsConstructor
public class MessageProducerController {

  private final RegisterUserRepo registerUserRepo;

  @GetMapping("/users")
  public List<RegisterUser> getAllUser() {
    return StreamSupport
        .stream(registerUserRepo.findAll().spliterator(), false)
        .toList();
  }
}
