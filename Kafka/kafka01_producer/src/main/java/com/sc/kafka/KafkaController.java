package com.sc.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/kafka")
@RequiredArgsConstructor
public class KafkaController {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private static final String TOPIC_NAME = "sbTopic01";

    @GetMapping("/publish/text")
    public String publish(@RequestParam String message) {
        kafkaTemplate.send(TOPIC_NAME, message);
        return "Message Sent";
    }
}
