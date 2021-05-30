package com.sc.graphqa01.resolver;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.sc.graphqa01.entity.Department;
import com.sc.graphqa01.service.DepartmentService;
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
