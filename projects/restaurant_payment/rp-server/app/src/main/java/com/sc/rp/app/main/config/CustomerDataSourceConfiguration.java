package com.sc.rp.app.main.config;

import java.util.HashMap;

import javax.sql.DataSource;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.flywaydb.core.Flyway;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Slf4j
@Configuration
@ConfigurationProperties("rp.db.customer")
@EnableJpaRepositories(
        basePackages = "${rp.db.customer.repoBasePackage}",
        entityManagerFactoryRef = "customerEntityManager",
        transactionManagerRef = "customerTransactionManager"
)
@Data
public class CustomerDataSourceConfiguration {
    private String url;
    private String user;
    private String password;
    private String delegate;
    private String driver;
    private String showSql;
    private String entityBasePackage;
    private String dbMigrationScriptLocation;

    @Bean
    public LocalContainerEntityManagerFactoryBean customerEntityManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(customerDataSource());
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

    @Bean
    public DataSource customerDataSource() {
        log.info("Creating customer_db datasource");
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(user);
        dataSource.setPassword(password);

        log.info("Trying to run customer_db migration scripts");
        Flyway.configure()
                .dataSource(dataSource)
                .baselineOnMigrate(true)
                .locations(dbMigrationScriptLocation)
                .load()
                .migrate();

        return dataSource;
    }

    @Bean
    public PlatformTransactionManager customerTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(customerEntityManager().getObject());
        return transactionManager;
    }
}
