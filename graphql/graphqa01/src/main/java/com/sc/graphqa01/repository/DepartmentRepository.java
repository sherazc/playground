package com.sc.graphqa01.repository;

import com.sc.graphqa01.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
