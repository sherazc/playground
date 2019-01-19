package com.sc.cdb.services;

import com.sc.cdb.data.dao.DashboardDao;
import com.sc.cdb.data.model.auth.Address;
import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.data.model.dashboard.*;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.UserRepository;
import org.bson.BsonArray;
import org.bson.BsonDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class DefaultDataLoader {
    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultDataLoader.class);
    private static final String INIT_DATA_dir = "init-data";

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final DashboardDao dashboardDao;
    private final MongoTemplate mongoTemplate;

    public DefaultDataLoader(CompanyRepository companyRepository,
                             UserRepository userRepository,
                             DashboardDao dashboardDao, MongoTemplate mongoTemplate) {
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.dashboardDao = dashboardDao;
        this.mongoTemplate = mongoTemplate;
    }


    public void load() {
        // loadTempTestData();
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


    // #################### BELOW ARE TEMP DATA #########################

    private void loadTempTestData() {
        companyRepository.deleteAll();
        Address address = new Address(
                "123 St",
                "City",
                "GA",
                "12345",
                "1.1",
                "2.2");
        Company company1 = new Company("company1", "Company Name 1", address, true, new Date());
        companyRepository.save(company1);

        Company company2 = new Company("company2", "Company Name 2", address, true, new Date());
        companyRepository.save(company2);


        // https://www.dailycred.com/article/bcrypt-calculator
        userRepository.deleteAll();
        User user = new User(
                "user1",
                company1.getId(),
                "user@email.com",
                "$2a$04$bl.8O/fUKciwtqKeMg8g.Ox/OGlEqleAgQq9Zuo5/HPPHhM8aLocG",
                "Sheraz",
                "User",
                Arrays.asList("USER"),
                true, true
        );
        userRepository.save(user);
        User user2 = new User(
                null,
                company1.getId(),
                "admin.user@email.com",
                "$2a$04$bl.8O/fUKciwtqKeMg8g.Ox/OGlEqleAgQq9Zuo5/HPPHhM8aLocG",
                "Sheraz",
                "Admin",
                Arrays.asList("ADMIN", "USER"),
                true, true
        );
        userRepository.save(user2);

        User user3 = new User(
                null,
                company1.getId(),
                "super.admin.user@email.com",
                "$2a$04$bl.8O/fUKciwtqKeMg8g.Ox/OGlEqleAgQq9Zuo5/HPPHhM8aLocG",
                "Sheraz",
                "Super Admin",
                Arrays.asList("SUPER_ADMIN", "USER"),
                true, true
        );
        userRepository.save(user3);

        User user4 = new User(
                null,
                company2.getId(),
                "super.admin.user@company2.com",
                "$2a$04$bl.8O/fUKciwtqKeMg8g.Ox/OGlEqleAgQq9Zuo5/HPPHhM8aLocG",
                "Sheraz",
                "At Company 2",
                Arrays.asList("SUPER_ADMIN", "ADMIN", "USER"),
                true, true
        );
        userRepository.save(user4);

        // Dashboard
        Dashboard dashboard = new Dashboard();

        dashboard.setCompanyId(company1.getId());

        dashboard.setAnnouncements(Collections.singletonList(new Announcement("Announcement Detail 1")));

        dashboard.setConfigurations(Arrays.asList(
                new Configuration("configuration 1", "value 1", "description 1"),
                new Configuration("configuration 2", "value 2", "description 2")
        ));

        dashboard.setEvents(Arrays.asList(
                new Event(new Date(), "Title 1", "Time 1", "description 1"),
                new Event(new Date(), "Title 2", "Time 2", "description 2")
        ));

        dashboard.setExpenses(Arrays.asList(
                new Expense("Line item 1", 100D),
                new Expense("Line item 2", 200D)
        ));

        dashboard.setFunds(Arrays.asList(
                new Fund("Fund Name 1", 1000D, 100D, 10D, new Date()),
                new Fund("Fund Name 2", 2000D, 200D, 20D, new Date())
        ));

        dashboard.setJummahs(Collections.singletonList(new Jummah(new Date(), "Khateeb 1", true)));

        dashboardDao.dropCollection();
        dashboardDao.save(dashboard);
        dashboardDao.updateComplexObject();
    }
}
