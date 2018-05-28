# Spring4 + CXF + JAXRS + REST + XSD + XML + Validation
## Description
This example show how CXF can validate XML schema validation.

## Documentation
http://cxf.apache.org/docs/jax-rs-data-bindings.html#JAX-RSDataBindings-Schemavalidation


### Notes
We are not using:
com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider
Instead we use:
org.apache.cxf.jaxrs.provider.json.JSONProvider
Because CXF's JSON Provider allows us to do validation.




### Method 1 of configuring schema
```xml
<beans>
<jaxrs:server address="/" serviceClass="org.apache.cxf.systest.jaxrs.BookStore">
  <jaxrs:schemaLocations>
     <jaxrs:schemaLocation>classpath:/schemas/a.xsd</jaxrs:schemaLocation>
     <jaxrs:schemaLocation>classpath:/schemas/b.xsd</jaxrs:schemaLocation>
     <!-- Possible from CXF 3.0.0 milestone2: -->
     <!-- 
         <jaxrs:schemaLocation>classpath:/schemas/</jaxrs:schemaLocation>
     --> 
  </jaxrs:schemaLocations>
</jaxrs:server>
</beans>
```

### Method 2 of configuring schema

```xml
<beans xmlns:util="http://www.springframework.org/schema/util">
 <jaxrs:server address="/" serviceClass="org.apache.cxf.systest.jaxrs.BookStore">
  <jaxrs:providers>
   <ref bean="jaxbProvider"/>
   <ref bean="jsonProvider"/>
  </jaxrs:providers>
 </jaxrs:server>
 
<bean id="jaxbProvider" class="org.apache.cxf.jaxrs.provider.JAXBElementProvider">
   <property name="schemaHandler" ref="schemaHolder"/>
</bean>
 
<bean id="jsonProvider" class="org.apache.cxf.jaxrs.provider.json.JSONProvider">
   <property name="schemaHandler" ref="schemaHolder"/>
</bean>
   
<bean id="schemaHolder" class="org.apache.cxf.jaxrs.utils.schemas.SchemaHandler">
   <property name="schemas" ref="theSchemas"/>
</bean>
   
<util:list id="theSchemas">
  <value>classpath:/WEB-INF/schemas/bookid.xsd</value>
  <value>classpath:/org/apache/cxf/systest/jaxrs/resources/book.xsd</value>
</util:list>
</beans>
```