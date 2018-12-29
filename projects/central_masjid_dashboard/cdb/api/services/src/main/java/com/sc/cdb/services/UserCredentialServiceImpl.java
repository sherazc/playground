package com.sc.cdb.services;

import com.sc.cdb.data.model.Credential;
import com.sc.cdb.data.model.User;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Optional;

@Service
public class UserCredentialServiceImpl implements UserCredentialService {
    private static final Logger LOG = LoggerFactory.getLogger(UserCredentialServiceImpl.class);

    private UserService userService;

    public UserCredentialServiceImpl(UserService userService) {
        this.userService = userService;
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

        User user = userOptional.get();
        user.setPassword(credential.getNewCredential());
        ServiceResponse<User> userServiceResponse = userService.createOrUpdate(user);
        if (userServiceResponse.isSuccessful()) {
            String message = "Successfully updated user credentials.";
            LOG.debug(message);
            return responseBuilder.message(message).successful(true).target(true).build();
        } else {
            String errorMessage = "Failed to updated user credentials. " + userServiceResponse.getMessage();
            return responseBuilder
                    .fieldErrors(userServiceResponse.getFieldErrors())
                    .message(errorMessage)
                    .build();
        }
    }

    @Override
    public ServiceResponse<Boolean> update(Credential credential) {
        System.out.println(credential);
        return null;
    }
}
