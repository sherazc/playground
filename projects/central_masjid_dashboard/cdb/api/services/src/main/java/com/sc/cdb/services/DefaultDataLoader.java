package com.sc.cdb.services;

import com.sc.cdb.services.common.StartupProfile;
import org.bson.BsonArray;
import org.bson.BsonDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

@Service
public class DefaultDataLoader {
    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultDataLoader.class);

    private final MongoTemplate mongoTemplate;
    private final StartupProfile startupProfile;

    public DefaultDataLoader(MongoTemplate mongoTemplate,
                             StartupProfile startupProfile) {
        this.mongoTemplate = mongoTemplate;
        this.startupProfile = startupProfile;
    }

    public void load() {
        Map<String, String> collectionResources = getCollectionResources();
        collectionResources.forEach(this::updateInitData);
        LOGGER.info("Database initialized!");
    }

    private Map<String, String> getCollectionResources() {
        String initDataDirectory = "/init-data/";
        Map<String, String> collectionResources = new HashMap<>();

        if (startupProfile.isActiveProfile(StartupProfile.types.dev.name())) {
//             collectionResources.put("centralControl", initDataDirectory + "centralControl.json");
//             collectionResources.put("company", initDataDirectory + "company.json");
//             collectionResources.put("user", initDataDirectory + "user.json");
//             collectionResources.put("prayerConfig", initDataDirectory + "prayerConfig.json");
        }

        collectionResources.put("hadith", initDataDirectory + "hadith.json");
        collectionResources.put("picklist", initDataDirectory + "picklist.json");
        return collectionResources;
    }

    private void updateInitData(String collectionName, String resourceName) {
        LOGGER.debug("Initializing collection {} with data in file {}", collectionName, resourceName);

        try (InputStream inputStream = getClass().getResource(resourceName).openStream()) {
            String fileContent = readStreamContent(inputStream);
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

    private String readStreamContent(InputStream inputStream) {
        Scanner scanner = new Scanner(inputStream).useDelimiter("\\A");
        return scanner.hasNext() ? scanner.next() : "";
    }
}
