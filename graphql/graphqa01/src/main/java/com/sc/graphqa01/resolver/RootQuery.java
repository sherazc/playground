package com.sc.graphqa01.resolver;

import java.util.ArrayList;
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
    /*
    public List<Integer> getRandomNumbers() {
        return IntStream.range(0, 10)
                // .map(i -> (int) (Math.random() * 1000))
                .boxed()
                .collect(Collectors.toList());
    }
    */

    public String myName() {
        return "Sheraz";
    }

    public List<Department> allDepartments() {
        return departmentService.getAllDepartments();
    }

}
