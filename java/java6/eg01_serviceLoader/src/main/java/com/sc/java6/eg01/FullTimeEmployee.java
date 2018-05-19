package com.sc.java6.eg01;

public class FullTimeEmployee implements Employee {

    public FullTimeEmployee() {
        System.out.println("Full-time employee created");
    }

    @Override
    public int calculateMonthlySalary(int salary) {
        return salary / 12;
    }
}
