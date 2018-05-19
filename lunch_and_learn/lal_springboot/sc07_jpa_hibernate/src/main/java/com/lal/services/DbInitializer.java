package com.lal.services;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

public class DbInitializer {

    public static void initialize(EntityManager entityManager) {
        try {
            Path path = Paths.get(DbInitializer.class.getClassLoader().getResource("create_db.sql").toURI());
            String entireScript = new String(Files.readAllBytes(path));

            Arrays.stream(entireScript.split(";"))
                    .map(String::trim)
                    .filter(query -> query.length() > 0)
                    .forEach(query -> {
                        EntityTransaction transaction = entityManager.getTransaction();
                        transaction.begin();
                        entityManager.createNativeQuery(query).executeUpdate();
                        transaction.commit();

                    });
            entityManager.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
