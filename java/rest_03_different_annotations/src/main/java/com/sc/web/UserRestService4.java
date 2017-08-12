package com.sc.web;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("/users4")
public class UserRestService4 {

	@POST
	@Path("/add")
	public Response addUser(@FormParam("name") String name, @FormParam("age") int age) {

		return Response.status(200).entity("UserRestService4.addUser() is called, name=" + name + ", age=" + age)
				.build();

	}

}
