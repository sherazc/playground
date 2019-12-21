package com.sc.cdb.services.email;

import java.io.StringWriter;
import java.util.Map;

import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.stereotype.Service;

@Service
public class TemplateEngineImpl implements TemplateEngine {

    private static final String TEMPLATE_PREFIX = "/email_templates/";
    private static final String TEMPLATE_SUFFIX = ".vm";

    private VelocityEngine velocityEngine;

    public TemplateEngineImpl(VelocityEngine velocityEngine) {
        this.velocityEngine = velocityEngine;
    }

    @Override
    public String parse(String templateName, Map<String, Object> arguments) {

        Template template = velocityEngine.getTemplate(TEMPLATE_PREFIX + templateName + TEMPLATE_SUFFIX);
        VelocityContext context = new VelocityContext();

        arguments.keySet().forEach(k -> context.put(k, arguments.get(k)));
        StringWriter stringWriter = new StringWriter();
        template.merge(context, stringWriter);

        return stringWriter.toString();
    }
}
