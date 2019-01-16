package com.sc.cdb;

import com.sc.cdb.data.dao.DashboardDao;
import com.sc.cdb.data.model.auth.Address;
import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.data.model.dashboard.*;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;

@SpringBootApplication(scanBasePackages = "com.sc")
public class Application implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(Application.class);

    private final MyService myService;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    private final DashboardDao dashboardDao;

    public Application(MyService myService,
                       CompanyRepository companyRepository,
                       UserRepository userRepository, DashboardDao dashboardDao) {
        this.myService = myService;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
        this.dashboardDao = dashboardDao;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
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
    }
}
