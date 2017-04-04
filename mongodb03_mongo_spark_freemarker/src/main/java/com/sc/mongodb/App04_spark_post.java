package com.sc.mongodb;

import com.sc.mongodb.util.FreemarkerUtil;
import freemarker.template.Template;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import java.io.StringWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class App04_spark_post {

    public static void main(String[] args) {

        Spark.setPort(8080);

        Spark.get("/", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                Map<String, Object> model = new HashMap<String, Object>();
                model.put("fruits", Arrays.asList("apple", "orange", "banana", "peach"));

                StringWriter writer = new StringWriter();
                Template template = FreemarkerUtil.getTemplate("app04_spark_post.ftl");
                try {
                    template.process(model, writer);
                } catch (Exception e) {
                    e.printStackTrace();
                }

                return writer;
            }
        });

        Spark.post("/favorite_fruit", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                String fruit= request.queryParams("fruit");

                if (fruit == null) {
                    return "Why don't you pick one?";
                } else {
                    return "Your favorite fruit is: <b>" + fruit + "</b>";
                }
            }
        });
    }
}
