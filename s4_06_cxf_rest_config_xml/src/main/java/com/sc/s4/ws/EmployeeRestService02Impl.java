package com.sc.s4.ws;

import com.sc.s4.util.CommonUtils;
import com.sc.s4.domain.Employee;
import com.sc.s4.domain.RestWsEmployee;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.stereotype.Component;

import javax.ws.rs.core.Response;

@Component("employeeRestService02")
public class EmployeeRestService02Impl implements EmployeeRestService02 {

    @Override
    public Response constructEmployeeForm(RestWsEmployee wsEmployee) {
        Integer secretSeed = NumberUtils.toInt(wsEmployee.getSecretSeed());
        Employee employee = new Employee();
        employee.setId(CommonUtils.touchLong(wsEmployee.getId()) + secretSeed);
        employee.setAge(NumberUtils.toInt(wsEmployee.getAge()) + secretSeed);
        employee.setName(CommonUtils.touchString(wsEmployee.getName()) + secretSeed);
        employee.setLocations(wsEmployee.getLocations());

        Response.ResponseBuilder responseBuilder = Response.ok(employee);

        return responseBuilder.build();
    }
}
