package com.sc.googleweb;

import java.io.IOException;
import java.util.Date;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sc.googleweb.db.utils.EMF;
import com.sc.googleweb.domain.Customer;

@SuppressWarnings("serial")
public class Googleweb01Servlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Hello, world");
		long time = new Date().getTime();
		Customer customer = new Customer(time, "Name: " + time);
		EntityManager em = EMF.get().createEntityManager();
		EntityTransaction transaction = em.getTransaction();
		transaction.begin();
		em.merge(customer);
		em.flush();
		transaction.commit();
		em.close();
		System.out.println(customer);
		resp.getWriter().println(customer);
		
	}
}
