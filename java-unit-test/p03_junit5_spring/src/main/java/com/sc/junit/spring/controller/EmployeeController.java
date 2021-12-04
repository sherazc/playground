package com.sc.junit.spring.controller;

import com.sc.junit.spring.model.Employee;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private final List<Employee> employees;

    public EmployeeController() {
        employees = new ArrayList<>();
        employees.add(new Employee(10, "name10", 10, dateFrom(2001, 1, 1)));
        employees.add(new Employee(20, "name20", 20, dateFrom(2002, 2, 2)));
        employees.add(new Employee(30, "name30", 30, dateFrom(2003, 3, 3)));
    }

    @GetMapping
    public List<Employee> findAll() {
        return employees;
    }

    @PostMapping
    public Employee add(@RequestBody Employee employee) {
        findAll().add(employee);
        return employee;
    }

    @GetMapping("{id}")
    public Employee findById(@PathVariable int id) {
        return employees.stream()
                .filter(e -> e.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @DeleteMapping("{id}")
    public Employee deleteById(@PathVariable int id) {
        Employee employee = findById(id);
        if (employee != null) {
            findAll().remove(employee);
        }
        return employee;
    }

    public static Date dateFrom(int year, int month, int dayOfMonth) {
        return Date.from(LocalDate.of(year, month, dayOfMonth)
                .atStartOfDay(ZoneId.systemDefault()).toInstant());
    }
}
