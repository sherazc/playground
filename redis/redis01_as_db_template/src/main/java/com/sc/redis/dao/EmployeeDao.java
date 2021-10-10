package com.sc.redis.dao;

import com.sc.redis.entity.Employee;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeDao {
    private static final String HASH_KEY = "Product";

    private final RedisTemplate<String, Object>  template;

    public EmployeeDao(RedisTemplate<String, Object> template) {
        this.template = template;
    }

    public Employee save(Employee employee) {
        template.opsForHash().put(HASH_KEY, employee.getId(), employee);
        return employee;
    }

    public List<Employee> findAll() {
        List<? extends Object> values = template.opsForHash().values(HASH_KEY);
        return (List<Employee>) values;
    }

    public Employee findById(Long id) {
        return (Employee) template.opsForHash().get(HASH_KEY, id);
    }

    public void delete(Long id) {
        template.opsForHash().delete(HASH_KEY, id);
    }
}
