package com.sc.s4.ws;

import com.sc.schema.company.Employee;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/employees-json")
public interface EmployeeRestService {

    @Path("/")
    @GET
    // @Produces(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_JSON)
    Response findAll();

    @Path("/")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response createEmployee(@BeanParam Employee employee);

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    Response findEmployee(@PathParam("id") Integer id);

    @Path("/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    Response deleteEmployee(@PathParam("id") Integer id);

    @Path("/{id}")
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response updateEmployee(@PathParam("id") Integer id, @BeanParam Employee employee);
}
