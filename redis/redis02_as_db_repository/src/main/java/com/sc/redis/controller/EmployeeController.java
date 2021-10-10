package com.sc.redis.controller;

import com.sc.redis.entity.Employee;
import com.sc.redis.repository.EmployeeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @PostMapping
    public Employee save(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    @GetMapping
    public List<Employee> findAll() {
        return StreamSupport
                .stream(employeeRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @GetMapping("{id}")
    public Employee findById(@PathVariable Long id) {
        return employeeRepository
                .findById(id)
                .orElse(null);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        employeeRepository.deleteById(id);
    }
}
