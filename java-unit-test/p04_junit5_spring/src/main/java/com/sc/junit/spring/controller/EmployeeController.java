package com.sc.junit.spring.controller;

import com.sc.junit.spring.model.Employee;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<Employee> findAll() {
        return employeeService.findAll();
    }

    @PostMapping
    public Employee add(@RequestBody Employee employee) {
        findAll().add(employee);
        return employee;
    }

    @GetMapping("{id}")
    public Employee findById(@PathVariable int id) {
        return employeeService.findById(id);
    }

    @DeleteMapping("{id}")
    public Employee deleteById(@PathVariable int id) {
        return employeeService.deleteById(id);
    }
}
