package com.lal.datasource;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class ConnectionUtil {
    private static EntityManagerFactory emf;

    public static EntityManagerFactory getEmf() {
        if (emf == null) {
            emf = Persistence.createEntityManagerFactory("lalPersistenceUnit");
        }
        return emf;
    }
}
