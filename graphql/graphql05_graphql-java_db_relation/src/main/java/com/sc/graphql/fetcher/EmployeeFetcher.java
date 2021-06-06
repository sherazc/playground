package com.sc.graphql.fetcher;

import java.util.List;

import com.sc.graphql.entity.Department;
import com.sc.graphql.entity.Employee;
import com.sc.graphql.service.EmployeeService;
import graphql.schema.DataFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmployeeFetcher {
    private final EmployeeService employeeService;

    public DataFetcher<List<Employee>> allEmployees() {
        return environment -> employeeService.getAllEmployees();
    }

    public DataFetcher<List<Employee>> getDepartmentEmployees() {
        return environment -> {
            Department department = environment.getSource();
            return employeeService.findByDepartmentId(department.getId());
        };
    }

}
