package com.sc.intellij.com.sc.intellij;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by SherazD on 10/25/2014.
 */
public class EmployeeDataServicesImpl implements EmployeeDataService {

    private static final List<Employee> allEmployees;

    static {
        allEmployees = new ArrayList<Employee>();
        allEmployees.add(new Employee(10L, "FirstName01", "LastName01", 100D, null));
        allEmployees.add(new Employee(20L, "FirstName02", "LastName02", 200D, null));
        allEmployees.add(new Employee(30L, "FirstName03", "LastName03", 300D, null));
    }

    @Override
    public List<Employee> getAllEmployees() {
        return allEmployees;
    }
}
