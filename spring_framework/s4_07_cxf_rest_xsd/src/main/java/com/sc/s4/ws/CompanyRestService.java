package com.sc.s4.ws;

import com.sc.schema.common.RequestQuery;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/company-service")
public interface CompanyRestService {

    @Path("/find")
    @POST
    @Consumes(MediaType.APPLICATION_XML)
    @Produces(MediaType.APPLICATION_XML)
    Response find(RequestQuery requestQuery);

}
