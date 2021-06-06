package com.sc.graphql.resolver;

import java.util.ArrayList;
import java.util.List;

import com.sc.graphql.entity.Department;
import com.sc.graphql.entity.Employee;
import com.sc.graphql.service.EmployeeService;
import graphql.kickstart.tools.GraphQLResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DepartmentResolver implements GraphQLResolver<Department> {
    private final EmployeeService employeeService;

    public List<Employee> getEmployees(Department department) {
        if (department == null || department.getId() == null) {
            return new ArrayList<>();
        }
        return employeeService.findByDepartmentId(department.getId());
    }
}
