package com.sc.kotlin.repository

import com.sc.kotlin.entity.Employee
import org.springframework.data.jpa.repository.JpaRepository

interface EmployeeRepository : JpaRepository<Employee, Int>
