package com.sc.web;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/users")
public class UserRestService {

	@GET
	public Response getUser() {
		return Response.status(200)
				.entity("UserRestService.getUser() is called").build();
	}

	@GET
	@Path("/vip")
	public Response getVipUser() {
		return Response.status(200)
				.entity("UserRestService.getVipUser() is called").build();
	}

	@GET
	@Path("{name}")
	public Response getUserByName(@PathParam("name") String name) {
		return Response.status(200)
				.entity("UserRestService.getUserByName() is called. " + name)
				.build();
	}

	@GET
	@Path("{id : \\d+}")
	public Response getUserById(@PathParam("id") String id) {
		return Response.status(200)
				.entity("UserRestService.getUserById() called, id : " + id)
				.build();
	}

	@GET
	@Path("/username/{username : [a-zA-Z][a-zA-Z_0-9]}")
	public Response getUserByUserName(@PathParam("username") String username) {
		return Response
				.status(200)
				.entity("UserRestService.getUserByUserName is called, username : "
						+ username).build();

	}
	
	@GET
	@Path("/books/{isbn : \\d+}")
	public Response getUserBookByISBN(@PathParam("isbn") String isbn) {
 
	   return Response.status(200)
		.entity("UserRestService.getUserBookByISBN is called, isbn : " + isbn).build();
 
	}
}
