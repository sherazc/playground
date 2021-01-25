package com.sc.graphqa01.service;

import com.sc.graphqa01.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
}
