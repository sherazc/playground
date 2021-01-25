package com.sc.graphqa01.service;

import com.sc.graphqa01.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;

}
