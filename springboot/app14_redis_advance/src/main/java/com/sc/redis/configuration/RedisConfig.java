package com.sc.redis.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class RedisConfig {

  public RedisCacheConfiguration globalCacheConfiguration() {
    return RedisCacheConfiguration
        .defaultCacheConfig() // configure all the defaults
        // .entryTtl(Duration.ofMinutes(5))
        .disableCachingNullValues()
        .prefixCacheNameWith("my_app::") // prefix all the keys. Used like namespace.
        .serializeKeysWith(
            // Stores key as String
            RedisSerializationContext.SerializationPair.fromSerializer(new StringRedisSerializer())
        )
        .serializeValuesWith(
            // Stores value as JSON
            RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer())
        );
  }


  @Bean
  public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
    // Each cache configuration
    Map<String, RedisCacheConfiguration> cacheConfigs = new HashMap<>();

    cacheConfigs.put("products", RedisCacheConfiguration.defaultCacheConfig()
        .entryTtl(Duration.ofMinutes(1)).serializeValuesWith(
        // Stores value as JSON
        RedisSerializationContext.SerializationPair.fromSerializer(new GenericJackson2JsonRedisSerializer())
    ));

    return RedisCacheManager.builder(connectionFactory)
        .cacheDefaults(globalCacheConfiguration())
        .withInitialCacheConfigurations(cacheConfigs)
        .build();
  }
}
