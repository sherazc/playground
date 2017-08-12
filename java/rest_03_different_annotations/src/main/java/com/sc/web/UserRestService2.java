package com.sc.web;

import java.util.Date;
import java.util.GregorianCalendar;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/users2")
public class UserRestService2 {

	@GET
	@Path("/date")
	public Response getUs() {
		return Response.status(200).entity("User").build();
	}

	
	@GET
	@Path("{year}/(month)/{day}")
	public Response getUserHistory(@PathParam("year") int year, @PathParam("month") int month, @PathParam("day") int day) {
		Date date = new GregorianCalendar(year, month, day).getTime();
		return Response.status(200).entity("UserRestService2.getUserHistory() called. Date=" + date).build();
	}
	
	@GET
	@Path("string/{year}/{month}/{day}")
	public Response getUserHistory(@PathParam("year") String year, @PathParam("year") String month, @PathParam("day") String day) {
		Date date = new GregorianCalendar(Integer.parseInt(year), Integer.parseInt(month), Integer.parseInt(day)).getTime();
		return Response.status(200).entity("UserRestService2.getUserHistory() called. Date=" + date).build();
	}
}
