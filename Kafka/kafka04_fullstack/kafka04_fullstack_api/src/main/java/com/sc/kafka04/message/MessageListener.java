package com.sc.kafka04.message;

import com.sc.kafka04.config.KafkaConfig;
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

  @KafkaListener(
      topics = KafkaConfig.RU_MESSAGE_TOPIC,
      groupId = KafkaConfig.RU_MESSAGE_GROUP,
      containerFactory = "myKafkaListenerContainerFactory"
  )
  public void listen(RegisterUserRecord registerUserRecord) {
    RegisterUser registerUser = RegisterUser.builder()
        .id(registerUserRecord.id())
        .userName(registerUserRecord.userName())
        .email(registerUserRecord.email())
        .userRole(registerUserRecord.userRole())
        .userPassword(registerUserRecord.userPassword())
        .registerTime(registerUserRecord.registerTime())
        .build();

    RegisterUser savedRegisterUser = registerUserRepo.save(registerUser);
    System.out.println(savedRegisterUser);
  }
}
