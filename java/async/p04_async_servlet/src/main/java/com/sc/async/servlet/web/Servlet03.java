package com.sc.async.servlet.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sc.async.servlet.common.MyThreadUtils;

@WebServlet(urlPatterns = "/servlet03", asyncSupported = false)
public class Servlet03 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");

        PrintWriter out = response.getWriter();

        for (int i = 0; i < 100; i++) {
            out.println("<div>Async content</div>");
            out.flush();
            MyThreadUtils.sleep(100);
        }
    }
}
