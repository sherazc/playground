package com.sc.graphql.service;

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
        IntStream.range(1, 5)
                .forEach(i -> {
                    Department department = new Department(null, "Department " + (i + 10));
                    Department savedDepartment = departmentRepository.save(department);
                    Employee e1 = new Employee(null, "EName " + (i + 100), i * 1000D,
                            savedDepartment.getId());
                    Employee e2 = new Employee(null, "EName " + (i + 200), i * 2000D,
                            savedDepartment.getId());
                    employeeRepository.save(e1);
                    employeeRepository.save(e2);
                });
        departmentRepository.findAll().forEach(d -> log.debug("Loaded {}",  d));
        employeeRepository.findAll().forEach(e -> log.debug("Loaded {}",  e));
    }
}
