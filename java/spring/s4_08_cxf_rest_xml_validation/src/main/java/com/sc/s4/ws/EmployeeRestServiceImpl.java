package com.sc.s4.ws;

import com.sc.s4.services.EmployeeService;
import com.sc.schema.company.Employee;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;

@Component("employeeRestService")
public class EmployeeRestServiceImpl implements EmployeeRestService {

    @Inject
    private EmployeeService employeeService;

    @Override
    public Response findAll() {


        List<Employee> employees = employeeService.findAll();
        // List employees = Arrays.asList("test");
        // String employees = "testing string";
        // String[] employees = new String[] {"one", "two", "three"};
        // Employee employees = employeeService.findAll().get(0);
        // Employee employees = new Employee();

        return Response.ok(employees).build();
    }

    @Override
    public Response findEmployee(Integer id) {
        return Response.ok(employeeService.findEmployee(id)).build();
    }

    @Override
    public Response deleteEmployee(Integer id) {
        employeeService.deleteEmployee(id);
        return Response.ok("employee deleted = " + id).build();
    }

    @Override
    public Response updateEmployee(Integer id, Employee employee) {
        employee.setId(id);
        employeeService.updateEmployee(employee);
        return Response.ok("employee updated = " + id).build();
    }

    @Override
    public Response createEmployee(Employee employee) {
        Employee employeeCreated = employeeService.createEmployee(employee);
        return Response.ok("employee created = " + employeeCreated.getId()).build();
    }
}
