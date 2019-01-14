package com.sc.cdb.webservices.auth.security;

import org.apache.catalina.Context;
import org.apache.catalina.connector.Connector;
import org.apache.tomcat.util.descriptor.web.SecurityCollection;
import org.apache.tomcat.util.descriptor.web.SecurityConstraint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile({"prod", "prodlocal"})
public class HttpsConfiguration {
    private static final Logger LOG = LoggerFactory.getLogger(HttpsConfiguration.class);

    @Value("${server.port.http}")
    private int httpPort;

    @Value("${server.port}")
    private int httpsPort;

    @Bean
    public ServletWebServerFactory servletContainer() {
        LOG.debug("Setting up ServletWebServerFactory");
        TomcatServletWebServerFactory tomcat = new TomcatServletWebServerFactory() {
            @Override
            protected void postProcessContext(Context context) {
                LOG.debug("Setting SecurityConstraint in postProcessContext");
                SecurityConstraint securityConstraint = new SecurityConstraint();
                securityConstraint.setUserConstraint("CONFIDENTIAL");
                SecurityCollection collection = new SecurityCollection();
                collection.addPattern("/*");
                securityConstraint.addCollection(collection);
                context.addConstraint(securityConstraint);
            }
        };
        tomcat.addAdditionalTomcatConnectors(redirectConnector());
        return tomcat;
    }

    private Connector redirectConnector() {
        LOG.debug("Creating redirect port Connector from {} to {}", this.httpPort, this.httpsPort);
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setScheme("http");
        connector.setPort(this.httpPort);
        connector.setSecure(false);
        connector.setRedirectPort(this.httpsPort);
        return connector;
    }
}
