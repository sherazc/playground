package com.sc.kotlin.controller

import com.sc.kotlin.entity.Employee
import com.sc.kotlin.service.EmployeeService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/employee")
class EmployeeController(
        private val employeeService: EmployeeService
) {
    @GetMapping
    fun findAll(): List<Employee> {
        return employeeService.findAll()
    }

    @PostMapping
    fun save(@RequestBody employee: Employee): Employee {
        return employeeService.save(employee)
    }
}
