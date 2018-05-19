package com.lal.services;

import org.hibernate.Session;
import org.hibernate.Transaction;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

public class DbInitializer {

    public static void initialize(Session session) {
        try {
            Path path = Paths.get(DbInitializer.class.getClassLoader().getResource("create_db.sql").toURI());
            String entireScript = new String(Files.readAllBytes(path));

            Arrays.stream(entireScript.split(";"))
                    .map(String::trim)
                    .filter(query -> query.length() > 0)
                    .forEach(query -> {
                        Transaction transaction = session.beginTransaction();
                        session.createNativeQuery(query).executeUpdate();
                        transaction.commit();
                    });
            session.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
