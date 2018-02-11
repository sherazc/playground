package com.sc.dp.factory;

import com.sc.dp.enums.EmployeeType;
import com.sc.dp.modal.BusinessAnalyst;
import com.sc.dp.modal.Developer;
import com.sc.dp.modal.Employee;
import com.sc.dp.modal.Qa;

public class EmployeeFactory {
    public static Employee create(EmployeeType employeeType) {
        Employee employee = null;
        switch (employeeType) {
            case businessAnalyst:
                employee = new BusinessAnalyst();
                break;
            case developer:
                employee = new Developer();
                break;
            case qa:
                employee = new Qa();
                break;
        }
        return employee;
    }
}
