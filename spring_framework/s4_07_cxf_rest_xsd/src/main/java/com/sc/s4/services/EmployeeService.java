package com.sc.s4.services;

import com.sc.s4.util.CommonUtils;
import com.sc.schema.common.LocationType;
import com.sc.schema.company.Department;
import com.sc.schema.company.Employee;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.stereotype.Component;

@Component
public class EmployeeService {

    public Employee findOne(String columnName, String columnValue) {
        Employee employee = null;
        if ("id".equalsIgnoreCase(columnName)) {
            employee = CommonUtils.OF_COMPANY.createEmployee();
            Department department = CommonUtils.OF_COMPANY.createDepartment();

            int columnValueInt = NumberUtils.toInt(columnValue);
            employee.setId(10 + columnValueInt);
            employee.setAge(20 + columnValueInt);
            employee.setName("EmployeeName " + (columnValueInt+ 30));

            employee.setAddress(createLocationType(columnValueInt + 40));
            employee.setDepartment(department);


            department.setId(50 + columnValueInt);
            department.setLocation(createLocationType(columnValueInt + 60));
        }
        return employee;
    }

    private LocationType createLocationType(int seed) {
        LocationType locationType = CommonUtils.OF_COMMON.createLocationType();
        locationType.setId(seed);
        locationType.setCity("City " + seed);
        locationType.setState("GA");
        locationType.setStreet(seed + "00 Street st");
        locationType.setZip(20000 + seed);
        return locationType;
    }
}
