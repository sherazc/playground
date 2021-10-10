package com.sc.redis.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash("Employee")
public class Employee implements Serializable {
    @Id
    private Long id;
    private String name;
    private String age;
    private Integer salary;
}
