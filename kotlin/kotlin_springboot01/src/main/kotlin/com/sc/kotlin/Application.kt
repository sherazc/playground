package com.sc.kotlin

import com.sc.kotlin.entity.Employee
import com.sc.kotlin.repository.EmployeeRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

// After starting up open
// http://localhost:8080/swagger-ui.html
@SpringBootApplication
class Application {

    // Single line function that create function interface object
    // This syntax create function "init"
    // Dependency inject employeeRepository in it
    // Create instance of CommandLineRunner in its run() implementation create employees
    // returns CommandLineRunner as spring bean
    @Bean
    fun init(employeeRepository: EmployeeRepository) = CommandLineRunner {
        employeeRepository.save(Employee(100, "E1"))
        employeeRepository.save(Employee(200, "E2"))
        employeeRepository.save(Employee(300, "E3"))
    }
}

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
