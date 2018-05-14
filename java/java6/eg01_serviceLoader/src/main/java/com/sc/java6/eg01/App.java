package com.sc.java6.eg01;

import java.util.ServiceLoader;

public class App {

    public static void main(String[] args) {
        ServiceLoader<Employee> serviceLoader = ServiceLoader.load(Employee.class);

        for (Employee employee : serviceLoader) {
            System.out.println(employee.getClass().getName()
                    + " 100 monthly salary = "
                    + employee.calculateMonthlySalary(100));
        }
    }
}
