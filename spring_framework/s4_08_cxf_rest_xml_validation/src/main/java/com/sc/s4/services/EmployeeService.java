package com.sc.s4.services;

import com.sc.s4.util.CommonUtils;
import com.sc.schema.common.LocationType;
import com.sc.schema.company.Department;
import com.sc.schema.company.Employee;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class EmployeeService {

    private static Map<Integer, Employee> allEmployees = new HashMap<>();
    private Integer currentAutoIncrement = 10;


    public EmployeeService() {
        Employee employee = generateEmployee(10);
        allEmployees.put(employee.getId(), employee);
    }

    public Employee createEmployee(Employee employee) {
        currentAutoIncrement += 10;
        employee.setId(currentAutoIncrement.intValue());
        allEmployees.put(currentAutoIncrement, employee);
        return employee;
    }

    public void updateEmployee(Employee employee) {
        allEmployees.put(employee.getId(), employee);
    }

    public void deleteEmployee(Integer id) {
        allEmployees.remove(id);
    }

    public Employee findEmployee(Integer id) {
        return allEmployees.get(id);
    }

    public Employee findById(String columnName, String columnValue) {
        Employee employee = null;
        if ("id".equalsIgnoreCase(columnName) && allEmployees.containsKey(Integer.parseInt(columnValue))) {
            employee = allEmployees.get(Integer.parseInt(columnValue));
        }
        return employee;
    }

    public List<Employee> findAll() {
        Collection<Employee> employeeCollection = allEmployees.values();
        List<Employee> result = null;
        if(employeeCollection != null) {
            result = new ArrayList<>(employeeCollection);
        }
        return result;
    }


    private Employee generateEmployee(Integer id) {
        id = currentAutoIncrement + id;
        Employee employee;
        employee = CommonUtils.OF_COMPANY.createEmployee();
        Department department = CommonUtils.OF_COMPANY.createDepartment();

        employee.setId(id);
        employee.setAge(20 + id);
        employee.setName("EmployeeName " + (id + 30));

        employee.setAddress(createLocationType(id + 40));
        employee.setDepartment(department);


        department.setId(50 + id);
        department.setLocation(createLocationType(id + 60));
        department.setName("DeptName_" + id);
        return employee;
    }

    private LocationType createLocationType(int seed) {
        LocationType locationType = CommonUtils.OF_COMMON.createLocationType();
        locationType.setId(seed);
        locationType.setCity("City " + seed);
        locationType.setState("TDDD");
        locationType.setStreet(seed + "00 Street st");
        locationType.setZip(20000 + seed);
        return locationType;
    }
}
