package com.sc.java6.eg01;

public class PartTimeEmployee implements Employee {

    public PartTimeEmployee() {
        System.out.println("Part-time employee created");
    }

    @Override
    public int calculateMonthlySalary(int salary) {
        return salary * 40 * 4;
    }
}
