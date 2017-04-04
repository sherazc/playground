package com.sc.s4.exception;

import javax.ws.rs.ClientErrorException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

public class ClientExceptionMapper implements ExceptionMapper<ClientErrorException> {

    @Override
    public Response toResponse(ClientErrorException e) {
        Response.ResponseBuilder responseBuilder = Response.status(Response.Status.NOT_FOUND);
        responseBuilder.header("Content-Type", "application/json");
        responseBuilder.entity("NOT FOUND. " + e.getMessage());
        return responseBuilder.build();
    }
}
