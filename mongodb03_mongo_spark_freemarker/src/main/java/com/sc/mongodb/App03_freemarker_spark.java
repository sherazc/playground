package com.sc.mongodb;

import freemarker.template.Configuration;
import freemarker.template.Template;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class App03_freemarker_spark {
    public static void main(String[] args) {
        final Configuration configuration = new Configuration(Configuration.VERSION_2_3_21);
        configuration.setClassForTemplateLoading(Objects.class, "/");

        Spark.setPort(8080);
        Spark.get("/", new Route() {
            @Override
            public Object handle(Request request, Response response) {
                StringWriter writer = new StringWriter();
                try {
                    Template template = configuration.getTemplate("app02_freemarker_template.ftl");
                    Map<String, Object> model = new HashMap<String, Object>();
                    model.put("name", "Freemarker");
                    template.process(model, writer);
                } catch (Exception e) {
                    Spark.halt(500);
                    e.printStackTrace();
                } finally {
                }
                return writer;
            }
        });
    }
}
