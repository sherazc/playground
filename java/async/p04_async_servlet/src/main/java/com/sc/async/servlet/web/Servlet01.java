package com.sc.async.servlet.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

import javax.servlet.AsyncContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.WriteListener;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sc.async.servlet.common.MyThreadUtils;

@WebServlet(urlPatterns = "/servlet01", asyncSupported = true)
public class Servlet01 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html");
        AsyncContext context = request.startAsync();
        Enumeration<String> data = Collections.enumeration(loadData("Hello World"));

        ServletOutputStream out = response.getOutputStream();

        out.setWriteListener(new WriteListener() {
            @Override
            public void onWritePossible() throws IOException {
                while (out.isReady()) {
                    if (data.hasMoreElements()) {
                        out.write(data.nextElement().getBytes());
                        out.flush();
                        MyThreadUtils.sleep(200);
                    } else {
                        context.complete();
                    }
                }
            }

            @Override
            public void onError(Throwable throwable) {
                System.out.println(throwable);
            }
        });


    }

    private List<String> loadData(String content) {


        return Arrays.asList(
                "<html>\n",
                "<body>\n",
                "<h1>\n",
                content,
                "\n<br>\n",content,
                "\n<br>\n",content,
                "\n<br>\n",content,
                "\n<br>\n",content,
                "\n<br>\n",content,
                "\n<br>\n",content,
                "\n<br>\n",content,
                "\n<br>\n",content,
                "\n<br>\n",content,
                "\n<br>\n",content,
                "\n<br>\n",
                "\n</h1>\n",
                "</body>\n",
                "</html>\n"
        );
    }
}
