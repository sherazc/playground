package com.sc.s4.controller;


import com.sc.s4.domain.Employee;
import com.sc.s4.services.EmployeeService;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.inject.Inject;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/rest")
public class RestController {

    @Inject
    private EmployeeService employeeService;

    @RequestMapping("/employees")
    public List<Employee> findAllEmployees() {
        return employeeService.findAllEmployee();
    }
}
