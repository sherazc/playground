package com.sc.kafka04.controller;

import com.sc.kafka04.dto.RegisterUserRecord;
import com.sc.kafka04.entity.RegisterUser;
import com.sc.kafka04.repository.RegisterUserRepo;
import lombok.AllArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/message-producer")
@AllArgsConstructor
public class MessageProducerController {

  private final RegisterUserRepo registerUserRepo;
  private final KafkaTemplate<String, RegisterUserRecord> kafkaTemplate;

  @GetMapping("/users")
  public List<RegisterUser> getAllUser() {
    return StreamSupport
        .stream(registerUserRepo.findAll().spliterator(), false)
        .toList();
  }

  @PostMapping("/users")
  public String saveUser(@RequestBody  RegisterUserRecord registerUser) {

    CompletableFuture<SendResult<String, RegisterUserRecord>> sendResultFuture
        = kafkaTemplate.send("message-topic", registerUser);

    try {
      SendResult<String, RegisterUserRecord> sendResult = sendResultFuture.get();
      System.out.println(sendResult.getProducerRecord().topic());
      System.out.println(sendResult.getProducerRecord().key());
      System.out.println(sendResult.getProducerRecord().value());
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    return "Register user process started.";
  }
}
