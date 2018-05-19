package com.lal.datasource;

import com.lal.entity.SiteInventoryItem;
import com.lal.entity.WarehouseInventoryItem;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.Properties;

public class ConnectionUtil {

    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {
        if (sessionFactory == null) {
            sessionFactory = createSessionFactory();
        }
        return sessionFactory;
    }

    private static SessionFactory createSessionFactory() {
        Properties properties = new Properties();
        properties.put("hibernate.connection.driver_class", "org.hsqldb.jdbc.JDBCDriver");
        properties.put("hibernate.connection.url", "jdbc:hsqldb:mem:mymemdb");
        properties.put("hibernate.connection.username", "SA");
        properties.put("hibernate.connection.password", "");
        properties.put("hibernate.connection.pool_size", "5");
        properties.put("hibernate.connection.pool_size", "5");
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.format_sql", "true");
        properties.put("hibernate.dialect", "org.hibernate.dialect.HSQLDialect");

        return new Configuration()
                .addAnnotatedClass(SiteInventoryItem.class)
                .addAnnotatedClass(WarehouseInventoryItem.class)
                .addProperties(properties)
                .buildSessionFactory();
    }
}
