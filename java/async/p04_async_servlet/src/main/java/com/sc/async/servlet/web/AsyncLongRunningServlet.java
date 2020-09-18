package com.sc.async.servlet.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.AsyncContext;
import javax.servlet.AsyncEvent;
import javax.servlet.AsyncListener;
import javax.servlet.ServletException;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebListener;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
// https://stackoverflow.com/questions/23240497/async-servlet-preferred-implementation

@WebServlet(urlPatterns = "/AsyncLongRunningServlet", asyncSupported = true)
public class AsyncLongRunningServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response) throws ServletException, IOException {
        System.out.println("Request Processing Thread " + Thread.currentThread().getName());

        request.setAttribute("org.apache.catalina.ASYNC_SUPPORTED", true);
        response.setContentType("text/html");
        PrintWriter printWriter = response.getWriter();
        printWriter.println("<html><head><title>Asynchronous servlet</title></head><body>");
        printWriter.println("Request Processing Thread " + Thread.currentThread().getName());
        printWriter.println("<br>");
        printWriter.println("<progress id='progress' max='100')></progress>");
        printWriter.println("<br>");

        AsyncContext asyncCtx = request.startAsync();
        asyncCtx.addListener(new AppAsyncListener());
        asyncCtx.setTimeout(6000);
        //release of request processing thread
        asyncCtx.start(() -> {
                    printWriter.println("<br>");
                    printWriter.println("Async thread Name " + Thread.currentThread().getName());
                    printWriter.println("<br>");

                    int i = 0;
                    while (i <= 100) {
                        printWriter.println("<script>document.getElementById('progress').value=\"" + i + "\";</script>");
                        printWriter.flush();
                        try {
                            Thread.sleep(100);
                        } catch (Exception e) {
                        }
                        i++;
                    }
                    printWriter.println("</body></html>");
                    asyncCtx.complete();
                }

        );
        printWriter.println("<br>");
        printWriter.println("End of response");
    }
}


//@WebListener
class AppAsyncListener implements AsyncListener {

    @Override
    public void onComplete(AsyncEvent asyncEvent) throws IOException {
        System.out.println("AppAsyncListener onComplete");
        // we can do resource cleanup activity here
    }

    @Override
    public void onError(AsyncEvent asyncEvent) throws IOException {
        System.out.println("AppAsyncListener onError");
        //we can return error response to client
    }

    @Override
    public void onStartAsync(AsyncEvent asyncEvent) throws IOException {
        System.out.println("AppAsyncListener onStartAsync");
        //we can log the event here
    }

    @Override
    public void onTimeout(AsyncEvent asyncEvent) throws IOException {
        System.out.println("AppAsyncListener onTimeout");
        //we can send appropriate response to client
        ServletResponse response = asyncEvent.getAsyncContext().getResponse();
        PrintWriter out = response.getWriter();
        out.write("TimeOut Error in Processing");

        out.println("</body></html>");
    }

}