package com.sc.intellij.com.sc.intellij;

import org.junit.Assert;
import org.junit.Test;

import java.util.List;

public class EmployeeDataServicesImplTest {

    @Test
    public void testGetAllEmployees() throws Exception {
        EmployeeDataService employeeDataService = new EmployeeDataServicesImpl();

        List<Employee> allEmployees = employeeDataService.getAllEmployees();
        Assert.assertNotNull(allEmployees);
        Assert.assertEquals(3, allEmployees.size());

    }
}