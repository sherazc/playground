package com.sc.junit.spring.service;

import com.sc.junit.spring.model.Employee;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class EmployeeServiceImpl implements EmployeeService {
    private final List<Employee> employees;

    public EmployeeServiceImpl() {
        employees = new ArrayList<>();
        employees.add(new Employee(10, "name10", 10, dateFrom(2001, 1, 1)));
        employees.add(new Employee(20, "name20", 20, dateFrom(2002, 2, 2)));
        employees.add(new Employee(30, "name30", 30, dateFrom(2003, 3, 3)));
    }

    @Override
    public List<Employee> findAll() {
        return employees;
    }

    @Override
    public Employee add(Employee employee) {
        findAll().add(employee);
        return employee;
    }

    @Override
    public Employee findById(int id) {
        return employees.stream()
                .filter(e -> e.getId() == id)
                .findFirst()
                .orElse(null);
    }

    @Override
    public Employee deleteById(int id) {
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
