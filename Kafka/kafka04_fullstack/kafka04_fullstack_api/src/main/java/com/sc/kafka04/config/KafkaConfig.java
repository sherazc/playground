package com.sc.kafka04.config;

import com.sc.kafka04.dto.RegisterUserRecord;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaConfig {

  // ConsumerFactory is used to listen to messages
  @Bean
  public ConsumerFactory<String, RegisterUserRecord> consumerFactory() {
    JsonDeserializer<RegisterUserRecord> deserializer =
        new JsonDeserializer<>(RegisterUserRecord.class);
    deserializer.addTrustedPackages("*"); // or use a specific package

    Map<String, Object> props = new HashMap<>();
    props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
    props.put(ConsumerConfig.GROUP_ID_CONFIG, "message-group");
    props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");

    return new DefaultKafkaConsumerFactory<>(
        props,
        new StringDeserializer(),
        deserializer
    );
  }

  @Bean
  public ConcurrentKafkaListenerContainerFactory<String, RegisterUserRecord> myKafkaListenerContainerFactory() {
    ConcurrentKafkaListenerContainerFactory<String, RegisterUserRecord> factory =
        new ConcurrentKafkaListenerContainerFactory<>();
    factory.setConsumerFactory(consumerFactory());
    return factory;
  }

  // ProducerFactory is used to send messages
  @Bean
  public ProducerFactory<String, RegisterUserRecord> producerFactory() {
    Map<String, Object> props = new HashMap<>();
    props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
    props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
    props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);
    return new DefaultKafkaProducerFactory<>(props);
  }

  @Bean
  public KafkaTemplate<String, RegisterUserRecord> kafkaTemplate() {
    return new KafkaTemplate<>(producerFactory());
  }
}

  /*
  ConcurrentKafkaListenerContainerFactory bean is used to
  - Concurrency (parallel processing)
  - Error handlers
  - Dead Letter Topics (DLT)
  - Manual acknowledgment
  - Batch processing
  - Message filtering, etc.

  @Bean
  public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory(
      ConsumerFactory<String, String> consumerFactory) {

    ConcurrentKafkaListenerContainerFactory<String, String> factory =
        new ConcurrentKafkaListenerContainerFactory<>();

    factory.setConsumerFactory(consumerFactory);

    // Choose one of the error handlers:

    // Option 1: Fixed Backoff (e.g., retry 3 times, 5s delay)
    factory.setCommonErrorHandler(new DefaultErrorHandler(new FixedBackOff(5000L, 3)));

    // Option 2: Exponential Backoff with Max Retries
    // ExponentialBackOffWithMaxRetries backOff = new ExponentialBackOffWithMaxRetries(5);
    // backOff.setInitialInterval(1000L);  // 1 second
    // backOff.setMultiplier(2);           // exponential
    // backOff.setMaxInterval(10000L);     // cap at 10 seconds
    // factory.setCommonErrorHandler(new DefaultErrorHandler(backOff));

    return factory;
  }
   */
