package com.sc.redis.config;

import org.springframework.boot.test.context.TestConfiguration;
import redis.embedded.RedisExecProvider;
import redis.embedded.RedisServer;
import redis.embedded.util.Architecture;
import redis.embedded.util.OS;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.IOException;

@TestConfiguration
public class TestRedisEmbServiceConfiguration {
    private RedisServer redisServer;

    public TestRedisEmbServiceConfiguration(RedisProperties redisProperties) {

        RedisExecProvider customProvider = RedisExecProvider.defaultProvider()
                .override(OS.UNIX, "/path/unix/redis")
                .override(OS.WINDOWS, Architecture.x86_64, "/path/windows/redis")
                .override(OS.MAC_OS_X, Architecture.x86_64, "/Users/sheraz/dev/redis-6.2.6/src/redis-server");

        try {
            // Server that is installed
            this.redisServer = new RedisServer(customProvider, redisProperties.getRedisPort());
        } catch (IOException e) {
            e.printStackTrace();
            // Embedded server
            this.redisServer = new RedisServer(redisProperties.getRedisPort());
        }
    }

    @PostConstruct
    public void postConstruct() {
        redisServer.start();
    }

    @PreDestroy
    public void preDestroy() {
        redisServer.stop();
    }
}
