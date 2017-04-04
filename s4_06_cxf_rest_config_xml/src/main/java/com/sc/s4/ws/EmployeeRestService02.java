package com.sc.s4.ws;

import com.sc.s4.domain.RestWsEmployee;

import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


public interface EmployeeRestService02 {

    @POST
    @Path("/employees02/construct/{eid}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    Response constructEmployeeForm(@BeanParam RestWsEmployee wsEmployee);
}
