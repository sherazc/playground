package com.sc.graphql.service;

import java.util.stream.IntStream;

import com.sc.graphql.entity.Department;
import com.sc.graphql.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataLoader {
    private final DepartmentRepository departmentRepository;

    public void load() {
        IntStream.range(1, 10)
                .forEach(i -> {
                    Department department = new Department(null, "Department " + (i + 10));
                    departmentRepository.save(department);
                });
        departmentRepository.findAll().forEach(d -> log.debug("Loaded {}",  d));
    }
}
