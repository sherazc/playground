package com.sc.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.jpa.vendor.HibernateJpaSessionFactoryBean;
import org.springframework.web.context.WebApplicationContext;

@SpringBootApplication
public class App03MvcJpaHibernateDerbyApplication extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {

        return builder.sources(App03MvcJpaHibernateDerbyApplication.class);
    }

    public static void main(String[] args) {
        ConfigurableApplicationContext applicationContext = SpringApplication.run(
                App03MvcJpaHibernateDerbyApplication.class, args);
        for (String beanName : applicationContext.getBeanDefinitionNames()) {
            System.out.println("Bean Name = " + beanName);
        }
    }

    @Override
    protected WebApplicationContext run(SpringApplication application) {
        WebApplicationContext applicationContext = super.run(application);
        for (String beanName : applicationContext.getBeanDefinitionNames()) {
            System.out.println("Bean Name = " + beanName);
        }
        return applicationContext;
    }

    // This is created to support Hibernate's SessionFactory
    @Bean
    public HibernateJpaSessionFactoryBean sessionFactory() {
        return new HibernateJpaSessionFactoryBean();
    }
}
