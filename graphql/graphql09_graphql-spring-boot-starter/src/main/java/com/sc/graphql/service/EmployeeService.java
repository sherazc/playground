package com.sc.graphql.service;

import java.util.List;
import java.util.Optional;

import com.sc.graphql.entity.Employee;
import com.sc.graphql.entity.EmployeeInput;
import com.sc.graphql.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public List<Employee> findByDepartmentId(Long departmentId) {
        return employeeRepository.findByDepartmentId(departmentId);
    }

    public Employee addEmployee(EmployeeInput employeeInput) {
        Employee employee = new Employee(null,
                employeeInput.getName(),
                employeeInput.getSalary(),
                employeeInput.getDepartmentId());

        return employeeRepository.save(employee);
    }

    public Employee deleteEmployee(Long id) {
        return employeeRepository.findById(id)
                .map(e -> {
                    employeeRepository.deleteById(e.getId());
                    return e;
                }).orElse(null);
    }

    public Employee updateEmployee(Long id, EmployeeInput employeeInput) {
        Employee employee = new Employee(id, employeeInput.getName(), employeeInput.getSalary(), employeeInput.getDepartmentId());
        return employeeRepository.save(employee);
    }
}
