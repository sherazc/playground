package com.sc.graphql.service;

import java.util.Arrays;
import java.util.stream.IntStream;

import com.sc.graphql.entity.Department;
import com.sc.graphql.entity.Employee;
import com.sc.graphql.repository.DepartmentRepository;
import com.sc.graphql.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader {
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    public void load() {
        IntStream.range(1, 10)
                .forEach(i -> {
                    Department department = new Department(null, "Department " + (i + 10), null);
                    Employee e1 = new Employee(null, "EName " + (i + 100), i * 1000D, department);
                    Employee e2 = new Employee(null, "EName " + (i + 200), i * 2000D, department);

                    department.setEmployees(Arrays.asList(e1, e2));
                    departmentRepository.save(department);
                    employeeRepository.save(e1);
                    employeeRepository.save(e2);


                });
        // departmentRepository.findAll().forEach(d -> log.debug("Loaded {}",  d));
        // employeeRepository.findAll().forEach(e -> log.debug("Loaded {}",  e));
    }
}
