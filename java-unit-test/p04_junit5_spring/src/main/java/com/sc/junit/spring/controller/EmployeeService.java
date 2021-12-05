package com.sc.junit.spring.controller;

import com.sc.junit.spring.model.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> findAll();

    Employee add(Employee employee);

    Employee findById(int id);

    Employee deleteById(int id);
}
