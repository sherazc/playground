package com.sc.jee;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.StringWriter;
import java.util.*;

@WebServlet("/vm/*")
public class VelocityServlet extends HttpServlet {
    public static final String VM_TEMPLATES_BASE_DIR = "/velocity_templates";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");

        VelocityEngine velocityEngine = new VelocityEngine();
        velocityEngine.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
        velocityEngine.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
        velocityEngine.init();

        Template template = velocityEngine.getTemplate(VM_TEMPLATES_BASE_DIR + request.getPathInfo());
        VelocityContext context = new VelocityContext();

        loadTestData(context);


        StringWriter stringWriter = new StringWriter();
        template.merge(context, stringWriter);


        response.getWriter().write(stringWriter.toString());
    }

    private void loadTestData(VelocityContext context) {

        context.put("name", "Sheraz");
        context.put("cars", new String[]{"BMW", "Honda", "Toyota"});
        context.put("age", 10);
        context.put("salary", 88.88);
        context.put("admin", true);
        context.put("dob", new Date());

        context.put("person",
                new Profile("NameA", new String[] {"CarA1", "CarA2"}, 10, 10.10, true, new Date()));

        context.put("people", Arrays.asList(
                new Profile("NameB", new String[] {"CarB1", "CarB2"}, 20, 20.20, false, new Date()),
                new Profile("NameC", new String[] {"CarC1", "CarC2"}, 30, 30.30, true, new Date()),
                new Profile("NameD", new String[] {"CarD1", "CarD2"}, 40, 40.40, false, new Date())
        ));

        context.put("myService", new MyService());

        Map<String, List<String>> computers = new HashMap<>();
        context.put("computers", computers);
        computers.put("ModalA", Arrays.asList("i3", "512mb", "usb2"));
        computers.put("ModalB", Arrays.asList("i5", "1tb", "usb3"));
        computers.put("ModalC", Arrays.asList("i7", "2tb", "usb-c"));
    }



}
