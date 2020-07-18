package com.sc.rp.app.main.config;

import java.util.HashMap;

import javax.sql.DataSource;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@ConfigurationProperties("rp.db.system")
@EnableJpaRepositories(
        basePackages = "${rp.db.system.repoBasePackage}",
        entityManagerFactoryRef = "systemEntityManager",
        transactionManagerRef = "systemTransactionManager"
)
@Data
public class SystemDataSourceConfiguration {
    private String url;
    private String user;
    private String password;
    private String delegate;
    private String driver;
    private String showSql;
    private String entityBasePackage;

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean systemEntityManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(systemDataSource());
        em.setPackagesToScan(entityBasePackage);

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<>();

        properties.put("hibernate.dialect", delegate);
        properties.put("hibernate.show_sql", showSql);
        properties.put("hibernate.format_sql", showSql);
        em.setJpaPropertyMap(properties);

        return em;
    }

    @Primary
    @Bean
    public DataSource systemDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(user);
        dataSource.setPassword(password);

        return dataSource;
    }

    @Primary
    @Bean
    public PlatformTransactionManager systemTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(systemEntityManager().getObject());
        return transactionManager;
    }
}