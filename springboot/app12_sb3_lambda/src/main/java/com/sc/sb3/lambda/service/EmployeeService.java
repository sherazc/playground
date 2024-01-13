package com.sc.sb3.lambda.service;

import com.sc.sb3.lambda.DtoModelMapper;
import com.sc.sb3.lambda.dto.EmployeeDto;
import com.sc.sb3.lambda.entity.EmployeeEntity;
import com.sc.sb3.lambda.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DtoModelMapper mapper;

    public EmployeeService(EmployeeRepository employeeRepository, DtoModelMapper mapper) {
        this.employeeRepository = employeeRepository;
        this.mapper = mapper;
    }

    public List<EmployeeDto> getAllEmployees() {
        List<EmployeeEntity> employees = employeeRepository.getAllEmployees();
        return mapper.entityToDto(employees);
    }
}
