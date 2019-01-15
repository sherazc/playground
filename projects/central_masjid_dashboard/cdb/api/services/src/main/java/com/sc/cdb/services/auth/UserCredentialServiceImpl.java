package com.sc.cdb.services.auth;

import com.sc.cdb.data.model.auth.Credential;
import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Optional;

@Service
public class UserCredentialServiceImpl implements UserCredentialService {
    private static final Logger LOG = LoggerFactory.getLogger(UserCredentialServiceImpl.class);

    private UserService userService;
    private PasswordEncoder passwordEncoder;

    public UserCredentialServiceImpl(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ServiceResponse<Boolean> reset(Credential credential) {
        LOG.debug("Resetting password of {}", credential.getEmail());
        ServiceResponse.ServiceResponseBuilder<Boolean> responseBuilder = ServiceResponse.builder();
        Optional<User> userOptional = userService.findUserByEmail(credential.getEmail());

        if (!userOptional.isPresent()) {
            String errorMessage = MessageFormat.format("Can not find user by email {0}.", credential.getEmail());
            LOG.error(errorMessage);
            return responseBuilder.target(false).successful(false).message(errorMessage).build();
        }

        return updateUserPassword(credential, responseBuilder, userOptional.get());
    }

    @Override
    public ServiceResponse<Boolean> update(Credential credential) {
        LOG.debug("Updating password of {}", credential.getEmail());
        ServiceResponse.ServiceResponseBuilder<Boolean> responseBuilder = ServiceResponse.builder();
        if (StringUtils.isBlank(credential.getExistingCredential())) {
            String errorMessage = "Failed to update user password. Existing password not provided.";
            LOG.error(errorMessage);
            return responseBuilder.target(false).successful(false).message(errorMessage).build();
        }

        Optional<User> userOptional = userService.findUserByEmail(credential.getEmail());
        if (!userOptional.isPresent()) {
            String errorMessage = MessageFormat.format("Can not find user by email {0}.", credential.getEmail());
            LOG.error(errorMessage);
            return responseBuilder.target(false).successful(false).message(errorMessage).build();
        }
        User user = userOptional.get();

        if (!passwordEncoder.matches(credential.getExistingCredential(), user.getPassword())) {
            String errorMessage = "Failed to update user password. Wrong existing password entered.";
            LOG.error(errorMessage);
            return responseBuilder.target(false).successful(false).message(errorMessage).build();
        }
        return updateUserPassword(credential, responseBuilder, user);
    }

    private ServiceResponse<Boolean> updateUserPassword(Credential credential, ServiceResponse.ServiceResponseBuilder<Boolean> responseBuilder, User user) {
        user.setPassword(credential.getNewCredential());
        ServiceResponse<User> userServiceResponse = userService.createOrUpdate(user);
        if (userServiceResponse.isSuccessful()) {
            String message = "Successfully updated user.";
            LOG.debug(message);
            return responseBuilder.message(message).successful(true).target(true).build();
        } else {
            String errorMessage = "Failed to update user. " + userServiceResponse.getMessage();
            return responseBuilder
                    .fieldErrors(userServiceResponse.getFieldErrors())
                    .message(errorMessage)
                    .build();
        }
    }
}
