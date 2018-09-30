package com.sc.cdb;

import com.sc.cdb.data.model.Address;
import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.data.repository.CompanyRepository;
import com.sc.cdb.data.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@SpringBootApplication(scanBasePackages = "com.sc")
public class Application implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(Application.class);

    private final MyService myService;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    public Application(MyService myService,
                       CompanyRepository companyRepository,
                       UserRepository userRepository) {
        this.myService = myService;
        this.companyRepository = companyRepository;
        this.userRepository = userRepository;
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
                "ST",
                "12345",
                "1.1",
                "2.2");
        Company company = new Company(null, "Company Name", address, "icon");
        companyRepository.save(company);


        // https://www.dailycred.com/article/bcrypt-calculator
        userRepository.deleteAll();
        User user = new User(
                null,
                company.getId(),
                "email@email.com",
                "$2a$04$bl.8O/fUKciwtqKeMg8g.Ox/OGlEqleAgQq9Zuo5/HPPHhM8aLocG",
                "First",
                "Last",
                true,
                Arrays.asList("USER")
        );
        userRepository.save(user);

    }
}
