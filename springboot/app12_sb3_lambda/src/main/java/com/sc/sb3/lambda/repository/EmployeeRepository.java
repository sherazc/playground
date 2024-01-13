package com.sc.sb3.lambda.repository;

import com.sc.sb3.lambda.entity.EmployeeEntity;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class EmployeeRepository {
    private final List<EmployeeEntity> employees = new ArrayList<>();

    public EmployeeRepository() {
        employees.add(new EmployeeEntity(100, "Sheraz"));
        employees.add(new EmployeeEntity(200, "Tariq"));
        employees.add(new EmployeeEntity(300, "Chaudhry"));
    }

    public List<EmployeeEntity> getAllEmployees() {
        return employees;
    }
}
