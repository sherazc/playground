package com.sc.graphql.fetcher;

import java.util.List;

import com.sc.graphql.entity.Department;
import com.sc.graphql.entity.Employee;
import com.sc.graphql.service.DepartmentService;
import graphql.schema.DataFetcher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DepartmentFetcher {
    private final DepartmentService departmentService;

    public DataFetcher<List<Department>> allDepartments() {
        return environment -> departmentService.getAllDepartments();
    }

    public DataFetcher<Department> getEmployeeDepartment() {
        return environment -> {
            Employee employee = environment.getSource();
            return departmentService
                    .findById(employee.getDepartmentId())
                    .orElse(null);
        };
    }
}
