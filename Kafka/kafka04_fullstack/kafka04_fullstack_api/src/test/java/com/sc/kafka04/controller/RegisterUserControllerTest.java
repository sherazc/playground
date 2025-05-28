package com.sc.kafka04.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sc.kafka04.config.KafkaConfig;
import com.sc.kafka04.dto.RegisterUserRecord;
import com.sc.kafka04.entity.RegisterUser;
import com.sc.kafka04.validator.RegisterUserValidator;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/*
Combination of these 2 are used when we want to do integration test. It loads the full application context
@SpringBootTest
@AutoConfigureMockMvc
*/

/*
Prefer @WebMvcTest() to test controllers. Because it only loads the
controller class and creates MockMvc bean.

 */
@WebMvcTest(controllers = RegisterUserController.class)
class RegisterUserControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @MockitoBean
  private KafkaTemplate<String, RegisterUserRecord> kafkaTemplate;

  @MockitoBean
  private RegisterUserValidator registerUserValidator;

  @MockitoBean
  private com.sc.kafka04.repository.RegisterUserRepo registerUserRepo;

  @BeforeEach
  void setUp() {
  }

  @Test
  void getAllUser() throws Exception {
    // Setup
    Iterable<RegisterUser> registerUsers = List.of(
        new RegisterUser(),
        new RegisterUser()
    );
    when(registerUserRepo.findAll()).thenReturn(registerUsers);

    // Call and Assert
    mockMvc.perform(get("/register/users"))
        .andDo(print())
        .andExpect(status().isOk())
    .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)));
  }

  @Test
  void testSaveUser_Success() throws Exception {
    RegisterUserRecord validUser = new RegisterUserRecord(
        1L,
        "Doe",
        "john@example.com",
        "password",
        "ADMIN", LocalDateTime.now().plusMinutes(10));

    ProducerRecord<String, RegisterUserRecord> mockProducerRecord =
        new ProducerRecord<>(KafkaConfig.RU_MESSAGE_TOPIC, validUser);
    SendResult<String, RegisterUserRecord> mockSendResult = mock(SendResult.class);
    when(mockSendResult.getProducerRecord()).thenReturn(mockProducerRecord);

    CompletableFuture<SendResult<String, RegisterUserRecord>> future = CompletableFuture.completedFuture(mockSendResult);

    when(kafkaTemplate.send(eq(KafkaConfig.RU_MESSAGE_TOPIC), any(RegisterUserRecord.class)))
        .thenReturn(future);

    mockMvc.perform(post("/register/users")
            .contentType(APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(validUser)))
        .andExpect(status().isOk())
        .andExpect(content().string("Register user process started."));
  }
}