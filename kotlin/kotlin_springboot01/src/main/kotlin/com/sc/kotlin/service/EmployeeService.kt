package com.sc.kotlin.service

import com.sc.kotlin.entity.Employee
import com.sc.kotlin.repository.EmployeeRepository
import org.springframework.stereotype.Service

interface EmployeeService {
    fun findAll(): List<Employee>
    fun save(employee: Employee): Employee
}

@Service
class EmployeeServiceImpl(
        private val employeeRepository: EmployeeRepository
) : EmployeeService {

    override fun findAll(): List<Employee> {
        return employeeRepository.findAll()
    }

    override fun save(employee: Employee): Employee {
        return employeeRepository.save(employee)
    }
}
