package com.sc.sb.eg02.controller;

import com.sc.sb.eg02.domain.Employee;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController("/employee")
public class EmployeesController {
    private List<Employee> employees;

    public EmployeesController() {
        employees = new ArrayList<>();
    }

    @GetMapping
    public List<Employee> getEmployees() {
        return employees;
    }

    @PostMapping
    public Employee postEmployee(@RequestBody Employee employee) {
        this.employees.add(employee);
        return employee;
    }

    @DeleteMapping("/employee/{employeeName}")
    public boolean deleteEmployee(@PathVariable String employeeName) {
        Employee employee = this.employees.stream()
                .filter(e -> e.getName().equalsIgnoreCase(employeeName))
                .findFirst().orElse(null);
        if (employee != null) {
            this.getEmployees().remove(employee);
            return true;
        } else {
            return false;
        }
    }
}
