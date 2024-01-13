package com.sc.sb3.lambda.controller;

import com.sc.sb3.lambda.dto.EmployeeDto;
import com.sc.sb3.lambda.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;

@RestController
@EnableWebMvc
public class EmployeeController {
    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @GetMapping
    @RequestMapping(path = "/employees")
    public ResponseEntity<List<EmployeeDto>> getAllEmployees() {
        List<EmployeeDto> employees = service.getAllEmployees();
        employees.forEach(e -> e.setName(e.getName() + ": changed"));
        return ResponseEntity.ok(employees);
    }

    @GetMapping
    @RequestMapping(path = "/")
    public ResponseEntity<List<EmployeeDto>> getAllEmployeesRoot() {
        List<EmployeeDto> employees = service.getAllEmployees();
        return ResponseEntity.ok(employees);
    }
}
