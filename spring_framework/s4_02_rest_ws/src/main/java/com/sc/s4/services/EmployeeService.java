package com.sc.s4.services;

import com.sc.s4.domain.Employee;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class EmployeeService {
    public List<Employee> findAllEmployee() {
        return Arrays.asList(new Employee(100), new Employee(200), new Employee(300));
    }
}
