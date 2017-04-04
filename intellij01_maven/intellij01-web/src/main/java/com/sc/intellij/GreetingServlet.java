package com.sc.intellij;

import javax.servlet.GenericServlet;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

/**
 * Created by SherazD on 10/26/2014.
 */
@WebServlet(value = "/greeting")
public class GreetingServlet extends GenericServlet {

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {

        String query = "select * from ";
        servletResponse.getWriter().println("Hello World!");
    }
}
