package com.sc.dp;

import com.sc.dp.enums.EmployeeType;
import com.sc.dp.factory.EmployeeFactory;
import com.sc.dp.modal.Employee;

public class App {
    public static void main( String[] args ) {
        Employee businessAnalyst = EmployeeFactory.create(EmployeeType.businessAnalyst);
        Employee developer = EmployeeFactory.create(EmployeeType.developer);
        Employee qa = EmployeeFactory.create(EmployeeType.qa);

        businessAnalyst.work();
        developer.work();
        qa.work();

    }
}
