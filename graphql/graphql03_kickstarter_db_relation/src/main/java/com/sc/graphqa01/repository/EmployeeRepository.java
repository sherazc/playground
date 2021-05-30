package com.sc.graphqa01.repository;

import com.sc.graphqa01.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
