package com.sc.mongodb.util;

import freemarker.template.Configuration;
import freemarker.template.Template;

import java.io.IOException;

public class FreemarkerUtil {

    private static Configuration configuration;

    private static Configuration configure() {
        if (configuration == null) {
            configuration = new Configuration(Configuration.VERSION_2_3_21);
            configuration.setClassForTemplateLoading(Object.class, "/");
        }
        return configuration;
    }

    public static Template getTemplate(String templatePath) {

        try {
            return FreemarkerUtil.configure().getTemplate(templatePath);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
