package com.sc.cdb.services;

import org.bson.BsonArray;
import org.bson.BsonDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class DefaultDataLoader {
    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultDataLoader.class);
    private static final String INIT_DATA_dir = "init-data";

    private final MongoTemplate mongoTemplate;

    public DefaultDataLoader(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public void load() {
        List<String> dataResources = listClasspathDirectory(INIT_DATA_dir);
        dataResources.forEach(this::updateInitData);
    }

    private void updateInitData(String resourceName) {
        try {
            LOGGER.debug("Updating data with {}", resourceName);
            Path resourcePath = Paths.get(ClassLoader.getSystemResource(resourceName).toURI());
            String collectionName = getCollectionName(resourcePath);

            String fileContent = new String(Files.readAllBytes(resourcePath));

            BsonArray bsonArray = BsonArray.parse(fileContent);
            mongoTemplate.dropCollection(collectionName);

            bsonArray.forEach(bsonValue -> {
                if (bsonValue instanceof BsonDocument) {
                    mongoTemplate.save(((BsonDocument) bsonValue).toJson(), collectionName);
                }
            });

        } catch (Exception e) {
            LOGGER.error("Error reading database init file: " + resourceName, e);
        }
    }

    private String getCollectionName(Path resourcePath) {
        File resourceFile = resourcePath.toFile();
        String fileName = resourceFile.getName();
        return fileName.substring(0, fileName.lastIndexOf('.'));
    }

    private List<String> listClasspathDirectory(String classpathDirectory) {
        List<String> resourceNames = new ArrayList<>();
        try (InputStream inputStream = getResourceAsStream(classpathDirectory);
             BufferedReader br = new BufferedReader(new InputStreamReader(inputStream))) {

            String resource;

            while ((resource = br.readLine()) != null) {
                resourceNames.add(classpathDirectory + "/" + resource);
            }
        } catch (IOException e) {
            String errorMessage = "Error occurred loading file names in " + classpathDirectory;
            LOGGER.error(errorMessage, e);
            throw new RuntimeException(errorMessage, e);
        }
        return resourceNames;
    }

    private InputStream getResourceAsStream(String resource) {
        final InputStream inputStream = ClassLoader.getSystemClassLoader().getResourceAsStream(resource);
        return inputStream == null ? getClass().getResourceAsStream(resource) : inputStream;
    }
}
