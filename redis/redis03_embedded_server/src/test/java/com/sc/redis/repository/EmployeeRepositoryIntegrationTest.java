package com.sc.redis.repository;

import com.sc.redis.config.TestRedisEmbServiceConfiguration;
import com.sc.redis.entity.Employee;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(classes = TestRedisEmbServiceConfiguration.class)
class EmployeeRepositoryIntegrationTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    public void shouldSaveEmployee() {
        Employee unsavedEmployee = new Employee(1L, "E1", 10, 100);
        employeeRepository.save(unsavedEmployee);
        Employee savedEmployee = employeeRepository.findById(1L).orElse(null);
        assertNotNull(savedEmployee);
    }
}