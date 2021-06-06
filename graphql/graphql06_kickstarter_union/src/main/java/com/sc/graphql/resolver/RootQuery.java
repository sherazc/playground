package com.sc.graphql.resolver;

import java.util.ArrayList;
import java.util.List;

import com.sc.graphql.entity.Department;
import com.sc.graphql.entity.Employee;
import com.sc.graphql.service.DepartmentService;
import com.sc.graphql.service.EmployeeService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RootQuery implements GraphQLQueryResolver {
    private final DepartmentService departmentService;
    private final EmployeeService employeeService;

    public List<Department> allDepartments() {
        return departmentService.getAllDepartments();
    }

    public List<Employee> allEmployees() {
        return employeeService.getAllEmployees();
    }

    public List<Object> allDeptEmps() {
        List<Object> result = new ArrayList<>(this.allDepartments());
        result.addAll(this.allEmployees());
        return result;
    }
}
