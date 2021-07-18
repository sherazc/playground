package com.sc.kafka.kafka01_producer;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kafka")
@RequiredArgsConstructor
public class KafkaController {

    private final KafkaTemplate<String, User> kafkaTemplate;
    private static final String TOPIC_NAME = "sbTopic02";

    @PostMapping("/publish/user")
    public String publish(@RequestBody User user) {
        kafkaTemplate.send(TOPIC_NAME, user);
        return "User Message Sent";
    }
}
