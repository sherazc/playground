package com.sc.kafka04.message;

import com.sc.kafka04.dto.RegisterUserRecord;
import com.sc.kafka04.entity.RegisterUser;
import com.sc.kafka04.repository.RegisterUserRepo;
import lombok.AllArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MessageListener {

  private final RegisterUserRepo registerUserRepo;

  @KafkaListener(topics = "message-topic", groupId = "message-group", containerFactory = "myKafkaListenerContainerFactory")
  public void listen(RegisterUserRecord registerUserRecord) {
    RegisterUser registerUser = RegisterUser.builder()
        .id(registerUserRecord.id())
        .userName(registerUserRecord.userName())
        .password(registerUserRecord.password())
        .registerTime(registerUserRecord.registerTime())
        .build();

    RegisterUser savedRegisterUser = registerUserRepo.save(registerUser);
    System.out.println(savedRegisterUser);
  }
}
