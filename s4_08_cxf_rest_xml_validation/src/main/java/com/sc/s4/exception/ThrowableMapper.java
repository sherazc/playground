package com.sc.s4.exception;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

public class ThrowableMapper implements ExceptionMapper<Throwable> {

    @Override
    public Response toResponse(Throwable throwable) {
        Response.ResponseBuilder responseBuilder = Response.status(Response.Status.INTERNAL_SERVER_ERROR);
        responseBuilder.header("Content-Type", "application/json");
        responseBuilder.entity("GENERIC DATA ERROR. " + throwable.getMessage());
        return responseBuilder.build();
    }
}
