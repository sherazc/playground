package com.sc.graphql.resolver;

import java.util.List;

import com.sc.graphql.entity.Department;
import com.sc.graphql.service.DepartmentService;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RootQuery implements GraphQLQueryResolver {
    private final DepartmentService departmentService;

    public List<Department> allDepartments() {
        return departmentService.getAllDepartments();
    }

    public Department getDepartmentById(Long id) {
        return departmentService.findById(id);
    }
}
