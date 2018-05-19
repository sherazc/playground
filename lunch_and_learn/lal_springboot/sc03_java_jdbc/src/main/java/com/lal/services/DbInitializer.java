package com.lal.services;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Arrays;

public class DbInitializer {

    public static void initialize(Connection connection) {
        try {
            Statement statement = connection.createStatement();

            Path path = Paths.get(DbInitializer.class.getClassLoader().getResource("create_db.sql").toURI());

            String entireScript = new String(Files.readAllBytes(path));

            Arrays.stream(entireScript.split(";"))
                    .map(String::trim)
                    .filter(query -> query.length() > 0)
                    .forEach(query -> {
                        try {
                            statement.execute(query);
                        } catch (SQLException e) {
                            e.printStackTrace();
                        }
                    });
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
