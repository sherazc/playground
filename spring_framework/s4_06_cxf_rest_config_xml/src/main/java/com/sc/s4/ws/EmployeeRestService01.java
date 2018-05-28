package com.sc.s4.ws;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/")
public interface EmployeeRestService01 {

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/employees01")
    Response employees();

    @GET
    @Produces({MediaType.APPLICATION_XML})
    @Path("/employees01-xml/{id}")
    Response employees_xml(@PathParam("id") Long employeeId);

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/employees01-json/{id}")
    Response employees_json(@PathParam("id") Long employeeId);

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/employees01-exception/{id}")
    Response exceptionTest(@PathParam("id") Long employeeId);
}
