package com.sc.web;

import java.util.List;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

@Path("/query")
public class UserRestService3 {

	@GET
	@Path("q1")
	public Response getUser1(@QueryParam("from") int from, @QueryParam("to") int to,
			@QueryParam("orderBy") List<String> orderBy) {
		return Response.status(200)
				.entity("UserRestService3.getUser1() called. from=" + from + " to=" + to + " orderBy=" + orderBy)
				.build();
	}

	@GET
	@Path("/q2")
	public Response getUsers2(@Context UriInfo info) {

		String from = info.getQueryParameters().getFirst("from");
		String to = info.getQueryParameters().getFirst("to");
		List<String> orderBy = info.getQueryParameters().get("orderBy");

		return Response
				.status(200)
				.entity("UserRestService3.getUser2() is called, from : " + from + ", to : " + to + ", orderBy"
						+ orderBy.toString()).build();

	}

	@GET
	@Path("/q3")
	public Response getUsers3(@DefaultValue("1000") @QueryParam("from") int from,
			@DefaultValue("999") @QueryParam("to") int to,
			@DefaultValue("name") @QueryParam("orderBy") List<String> orderBy) {

		return Response
				.status(200)
				.entity("UserRestService3.getUser3() is called, from : " + from + ", to : " + to + ", orderBy"
						+ orderBy.toString()).build();

	}
}
