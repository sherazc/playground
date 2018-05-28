package com.sc.s4.config;

import com.sc.s4.service.WeatherServiceEndpoint;
import com.sc.s4.ws.weatherservice.Weather;
import com.sc.s4.ws.weatherservice.WeatherService;
import org.apache.cxf.Bus;
import org.apache.cxf.bus.spring.SpringBus;
import org.apache.cxf.jaxws.EndpointImpl;
import org.apache.cxf.transport.servlet.CXFServlet;
import org.springframework.boot.context.embedded.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.jws.WebService;
import javax.xml.ws.Endpoint;

@Configuration
public class AppContextConfiguration {

    @Bean
    public ServletRegistrationBean cxfDispatcherServlet() {
        return new ServletRegistrationBean(new CXFServlet(), "/soap-api/*");
    }

    @Bean(name = Bus.DEFAULT_BUS_ID)
    public SpringBus springBus() {
        return new SpringBus();
    }

    @Bean
    public WeatherService weatherService() {
        return new WeatherServiceEndpoint();
    }

    @Bean
    public Endpoint endpoint() {
        WeatherService weatherService = weatherService();
        Weather weather = weather();


        // CXF JAX-WS implementation relies on the correct ServiceName as QName-Object with
        // the name-Attribute´s text <wsdl:service name="Weather"> and the targetNamespace
        // "http://www.sc.com/s4/ws/weatherservice/"
        // Also the WSDLLocation must be set
        EndpointImpl endpoint = new EndpointImpl(springBus(), weatherService);
        endpoint.setServiceName(weather.getServiceName());
        endpoint.setWsdlLocation(weather.getWSDLDocumentLocation().toString());
        // endpoint.setWsdlLocation("Weather1.0.wsdl");
        endpoint.publish("/WeatherSoapService_1.0");
        return endpoint;
    }

    @Bean
    public Weather weather() {
        // Weather is webservice client (@WebServiceClient)
        // Needed for correct ServiceName & WSDLLocation to publish contract first incl. original WSDL
        return new Weather();
    }
}
