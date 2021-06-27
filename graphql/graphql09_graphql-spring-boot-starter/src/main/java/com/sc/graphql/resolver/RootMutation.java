package com.sc.graphql.resolver;

import com.sc.graphql.entity.Department;
import com.sc.graphql.entity.Employee;
import com.sc.graphql.entity.EmployeeInput;
import com.sc.graphql.service.DepartmentService;
import com.sc.graphql.service.EmployeeService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RootMutation implements GraphQLMutationResolver {
    private final DepartmentService departmentService;
    private final EmployeeService employeeService;

    public Department addDepartment(String name) {
        return departmentService.addDepartment(name);
    }

    public Employee addEmployee(EmployeeInput employeeInput) {
        return employeeService.addEmployee(employeeInput);
    }

    public Employee deleteEmployee(Long id) {
        return employeeService.deleteEmployee(id);
    }

    public Employee updateEmployee(Long id, EmployeeInput employeeInput) {
        return employeeService.updateEmployee(id, employeeInput);
    }
}
