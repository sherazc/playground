package com.sc.mongodb;

import freemarker.template.Configuration;
import freemarker.template.Template;

import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

public class App02_freemarker {
    public static void main(String[] args) throws Exception {
        // Bootstrap Freemarker
        Configuration configuration = new Configuration(Configuration.VERSION_2_3_21);
        configuration.setClassForTemplateLoading(App02_freemarker.class, "/");

        // Get the template from classpath
        Template app02FreemarkerTemplate = configuration.getTemplate("app02_freemarker_template.ftl");

        StringWriter writer = new StringWriter();

        // Loading Map model with values
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("name", "Freemarker");

        // Process freemarker template and streamed result in writer
        app02FreemarkerTemplate.process(model, writer);

        // Printing result
        System.out.println(writer.toString());
    }
}
