package com.sc.cdb.services;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import com.sc.cdb.data.repository.UserRepository;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.Optional;

@Component
public class UserServiceImpl implements UserService {
    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);
    private UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findUserByEmail(String email) {
        LOG.info("Searching for user by email: {}", email);
        if (StringUtils.isBlank(email)) {
            LOG.info("Can not find user. Email is empty");
            return Optional.empty();
        }
        return userRepository.findByEmailIgnoreCase(email);
    }

    @Override
    public ServiceResponse<User> createOrUpdate(User user) {
        LOG.debug("Registering user {}", user.getEmail());
        ServiceResponse.ServiceResponseBuilder<User> builder = ServiceResponse.builder();
        builder.target(user);

        Optional<User> existingUserOptional = this.userRepository.findByEmailIgnoreCase(user.getEmail());
        if (existingUserOptional.isPresent()) {
            return builder.build().rejectField(
                    "user.email",
                    MessageFormat.format(
                            "{0} already exists.", existingUserOptional.get().getEmail()));
        }

        Company savedCompany = companyRepository.save(company);
        builder.target(savedCompany);

        return builder.build().accept(MessageFormat.format(
                "Company {0} successfully created.",
                company.getName()));


        return null;
    }
}
