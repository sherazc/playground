package com.sc.s4.ws;

import com.sc.s4.services.EmployeeService;
import com.sc.schema.common.ColumnType;
import com.sc.schema.common.RequestQuery;
import com.sc.schema.company.Employee;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import java.util.List;

@Component("companyRestService")
public class CompanyRestServiceImpl implements CompanyRestService {

    @Inject
    private EmployeeService employeeService;

    @Override
    public Response find(RequestQuery requestQuery) {
        List<ColumnType> columnCriterias = requestQuery.getColumnCriteria();

        Employee employee = null;
        if ("EMPLOYEE".equalsIgnoreCase(requestQuery.getEntityType())) {
            ColumnType columnType = columnCriterias.get(0);
            employee = employeeService.findOne(columnType.getColumnName(), columnType.getColumnValue());
        }

        return Response.ok(employee).build();
    }
}
