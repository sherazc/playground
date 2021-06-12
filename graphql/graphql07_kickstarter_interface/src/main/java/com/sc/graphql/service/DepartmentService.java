package com.sc.graphql.service;

import java.util.List;
import java.util.Optional;

import com.sc.graphql.entity.Department;
import com.sc.graphql.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Optional<Department> findById(Long id) {
        if (id == null) {
            return Optional.empty();
        }
        return departmentRepository.findById(id);
    }
}
