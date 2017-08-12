package com.sc.s4.ws;

import com.sc.s4.domain.Employee;
import com.sc.s4.exception.BusinessLogicException;
import com.sc.s4.services.EmployeeService;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.ws.rs.ClientErrorException;
import javax.ws.rs.ServerErrorException;
import javax.ws.rs.core.Response;
import java.util.List;

@Component("employeeRestService01")
public class EmployeeRestService01Impl implements EmployeeRestService01 {

    @Inject
    private EmployeeService employeeService;

    public Response getEmployeeResponseById(Long employeeId) {
        Response result;
        if (employeeId == null) {
            result = Response.status(Response.Status.BAD_REQUEST).build();
        } else {

            Employee employee = employeeService.findEmployeeById(employeeId);

            result = Response.ok(employee).build();
        }

        return result;
    }

    @Override
    public Response employees() {
        List<Employee> employees = employeeService.findAllEmployee();
        return Response.ok(employees).build();
    }

    @Override
    public Response employees_xml(Long employeeId) {
        return getEmployeeResponseById(employeeId);
    }

    @Override
    public Response employees_json(Long employeeId) {
        return getEmployeeResponseById(employeeId);
    }

    @Override
    public Response exceptionTest(Long employeeId) {
        if (employeeId > 1000) {
            throw new ClientErrorException("Cant find employeeId=" + employeeId, Response.Status.NOT_FOUND);
        }

        if (employeeId < 1) {
            throw new ServerErrorException("Server crashed because employeeId is less than 1. " + employeeId,
                    Response.Status.INTERNAL_SERVER_ERROR);
        }

        if (employeeId == 800) {
            throw new BusinessLogicException("Business login fails on 800");
        }
        return getEmployeeResponseById(employeeId);
    }
}
