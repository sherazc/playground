package com.sc.cdb.services;

import com.sc.cdb.data.model.User;
import com.sc.cdb.data.repository.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

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
        User user = userRepository.findByEmail(email);
        LOG.debug("User found: {}", user);
        return Optional.ofNullable(user);
    }
}
