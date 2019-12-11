package com.sc.cdb;

import com.sc.cdb.services.DefaultDataLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.sc")
public class Application implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(Application.class);

    private final DefaultDataLoader defaultDataLoader;

    public Application(DefaultDataLoader defaultDataLoader) {
        this.defaultDataLoader = defaultDataLoader;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        this.defaultDataLoader.load();
        /*
        CentralControl cc = new CentralControl();
        cc.setCompanyId("company1");
        cc.setEvents(Collections.singletonList(new Event(null, "test", null, null)));
        centralControlDao.save(cc);
        centralControlDao.updateComplexObject();
        */
    }
}
