package com.sc.redis.controller;

import com.sc.redis.dao.EmployeeDao;
import com.sc.redis.entity.Employee;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    private final EmployeeDao employeeDao;

    public EmployeeController(EmployeeDao employeeDao) {
        this.employeeDao = employeeDao;
    }

    @PostMapping
    public Employee save(@RequestBody Employee employee) {
        return employeeDao.save(employee);
    }

    @GetMapping
    public List<Employee> findAll() {
        return employeeDao.findAll();
    }

    @GetMapping("{id}")
    public Employee findById(@PathVariable Long id) {
        return employeeDao.findById(id);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        employeeDao.delete(id);
    }
}
