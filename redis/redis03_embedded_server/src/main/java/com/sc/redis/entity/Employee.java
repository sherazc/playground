package com.sc.redis.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@Data
@RedisHash("Employee")
@NoArgsConstructor
@AllArgsConstructor
public class Employee implements Serializable {
    @Id
    private Long id;
    private String name;
    private Integer age;
    private Integer salary;
}
