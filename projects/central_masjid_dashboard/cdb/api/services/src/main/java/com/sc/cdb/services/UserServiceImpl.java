package com.sc.cdb.services;

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

        boolean update = StringUtils.isNotBlank(user.getId());
        Optional<User> existingUserOptional = getExistingUser(user, update);

        if (existingUserOptional.isPresent()) {
            return builder.build().rejectField(
                    "user.email",
                    MessageFormat.format(
                            "{0} already exists.", existingUserOptional.get().getEmail()));
        }

        User savedUser = userRepository.save(user);
        builder.target(savedUser);

        String successMessage;
        if (update) {
            successMessage = MessageFormat.format(
                    "User {0} successfully updated.",
                    user.getEmail());
        } else {
            successMessage = MessageFormat.format(
                    "User {0} successfully created.",
                    user.getEmail());
        }

        return builder.build().accept(successMessage);
    }

    private Optional<User> getExistingUser(User user, boolean update) {
        Optional<User> existingUserOptional;
        if (update) {
            existingUserOptional = this.userRepository.findByIdIsNotAndEmailIgnoreCase(user.getId(), user.getEmail());
        } else {
            existingUserOptional = this.userRepository.findByEmailIgnoreCase(user.getEmail());
        }
        return existingUserOptional;
    }
}
