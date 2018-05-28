package com.sc.s4.exception;

import javax.ws.rs.ServerErrorException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

public class ServerExceptionMapper implements ExceptionMapper<ServerErrorException> {

    @Override
    public Response toResponse(ServerErrorException e) {
        Response.ResponseBuilder responseBuilder = Response.status(Response.Status.INTERNAL_SERVER_ERROR);
        responseBuilder.header("Content-Type", "application/json");
        responseBuilder.entity("INTERNAL SERVER ERROR. " + e.getMessage());
        return responseBuilder.build();
    }
}
