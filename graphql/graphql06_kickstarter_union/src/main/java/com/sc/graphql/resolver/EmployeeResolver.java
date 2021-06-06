package com.sc.graphql.resolver;

import com.sc.graphql.entity.Department;
import com.sc.graphql.entity.Employee;
import com.sc.graphql.service.DepartmentService;
import graphql.kickstart.tools.GraphQLResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmployeeResolver implements GraphQLResolver<Employee> {

    private final DepartmentService departmentService;

    public Department getDepartment(Employee employee) {
        return departmentService
                .findById(employee.getDepartmentId())
                .orElse(null);
    }
}
