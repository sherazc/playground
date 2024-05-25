package com.sc.cdb.services.auth;

import com.sc.cdb.config.AppConfiguration;
import com.sc.cdb.data.dao.UserDao;
import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.data.repository.UserRepository;
import com.sc.cdb.services.email.EmailService;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Component
public class UserServiceImpl implements UserService {
    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);
    private static final long EMAIL_VERIFY_EXPIRATION_LIMIT = 1000 * 60 * 60;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private CompanyService companyService;
    private UserDao userDao;
    private EmailService emailService;
    private AppConfiguration appConfiguration;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
                           CompanyService companyService, UserDao userDao,
                           @Qualifier("asyncEmailService") EmailService emailService, AppConfiguration appConfiguration) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.companyService = companyService;
        this.userDao = userDao;
        this.emailService = emailService;
        this.appConfiguration = appConfiguration;
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

        Optional<Company> companyOptional = companyService.findCompanyById(user.getCompanyId());

        if (!companyOptional.isPresent()) {
            String errorMessage = MessageFormat.format("Can not save user. CompanyId {0} not found.", user.getCompanyId());
            LOG.error(errorMessage);
            return builder.message(errorMessage).build();
        }

        boolean update = StringUtils.isNotBlank(user.getId());
        Optional<User> existingUserWithSameEmailOptional = getExistingUserWithSameEmail(user, update);

        if (existingUserWithSameEmailOptional.isPresent()) {
            String errorMessage = MessageFormat.format(
                    "{0} already exists.", existingUserWithSameEmailOptional.get().getEmail());
            LOG.error(errorMessage);
            return builder.build().rejectField("user.email", errorMessage);
        }

        if (StringUtils.isBlank(user.getPassword())) {
            String errorMessage = "Can not save user. Password is blank.";
            LOG.error(errorMessage);
            return builder.build().rejectField("user.password", errorMessage);
        }

        if (!isPasswordAlreadyEncoded(user.getPassword())) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        User savedUser = userRepository.save(user);
        builder.target(savedUser);

        String successMessage;
        if (update) {
            successMessage = MessageFormat.format(
                    "User {0} successfully updated.",
                    savedUser.getEmail());
        } else {
            successMessage = MessageFormat.format(
                    "User {0} successfully created.",
                    savedUser.getEmail());

            sendVerifyEmail(savedUser);
        }
        LOG.debug(successMessage);
        return builder.build().accept(successMessage);
    }

    private void sendVerifyEmail(User user) {
        if (!appConfiguration.getEmail().getEnable()) {
            LOG.warn("Not sending verify email. Email is not enabled.");
            return;
        }
        String emailVerifyCode = UUID.randomUUID().toString();
        String serverUrl = "https://www.masjiddashboard.com";
        // // "%s/api/auth/companies/%s/users/%s/verify/%s",
        String link = String.format(
                "%s/auth/register/verify?userId=%s&emailVerifyCode=%s",
                serverUrl, user.getId(), emailVerifyCode);

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("name", user.getFirstName());
        attributes.put("verify_link", link);

        LOG.debug("Sending email with verify link: {}", link);
        emailService.send(
                "donotreply@masjiddashboard.com",
                user.getEmail(),
                "Registration Confirmation",
                "email_verify",
                attributes);

        user.setEmailVerifyCode(emailVerifyCode);
        user.setRegistrationDate(new Date());
        user.setVerified(false);
        user.setActive(false);
        userRepository.save(user);
    }

    private boolean isPasswordAlreadyEncoded(String password) {
        return StringUtils.isNotBlank(password) && password.startsWith("$2");
    }

    @Override
    public Optional<User> findCompanyUser(String companyId, String userId) {
        LOG.debug("Searching for user. companyId = {}, userId = {}", companyId, userId);
        if (StringUtils.isBlank(companyId) || StringUtils.isBlank(userId)) {
            LOG.warn("Can not search for user. Bad arguments. companyId = {}, userId = {}", companyId, userId);
            return Optional.empty();
        }
        return this.userRepository.findByCompanyIdAndId(new ObjectId(companyId), new ObjectId(userId));
    }

    @Override
    public ServiceResponse<User> verifyEmail(String userId, String emailVerifyCode) {
        ServiceResponse.ServiceResponseBuilder<User> responseBuilder = ServiceResponse.builder();

        Optional<User> userOptional = this.userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (StringUtils.equals(user.getEmailVerifyCode(), emailVerifyCode)
                    && !isVerificationExpired(user.getRegistrationDate())) {

                boolean activated = activateAndVerifyUser(user);
                activateCompanyIfNeeded(user.getCompanyId());
                if (activated) {
                    responseBuilder.target(user);
                    responseBuilder.successful(true);
                    responseBuilder.message("Successfully verified " + user.getEmail()
                            + ". Please login to setup prayer times and other configurations.");
                } else {
                    responseBuilder.message("Failed to verified email address.");
                }
            } else {
                responseBuilder.message("Registration expired. Please try to register again.");
            }
        } else {
            responseBuilder.message("User not found.");
        }

        return responseBuilder.build();
    }

    @Override
    public ServiceResponse<User> activateUser(String userId, boolean active) {
        ServiceResponse.ServiceResponseBuilder<User> responseBuilder = ServiceResponse.builder();
        if (!ObjectId.isValid(userId)) {
            responseBuilder.message("Invalid userId");
            return responseBuilder.build();
        }
        boolean successful = userDao.activateUser(userId, active);
        responseBuilder.successful(successful);
        if (successful) {
            User user = new User();
            user.setId(userId);
            user.setActive(active);
            responseBuilder.target(user);
            responseBuilder.message("Successfully updated user");
        } else {
            responseBuilder.message("Failed to update user");
        }

        return responseBuilder.build();
    }

    private void activateCompanyIfNeeded(String companyId) {
        Long usersCount = userRepository.countCompanyUsers(new ObjectId(companyId));
        if (usersCount == 1) {
            companyService.activateCompany(companyId, true);
        }
    }

    private boolean activateAndVerifyUser(User user) {
        user.setActive(true);
        user.setVerified(true);
        user.setEmailVerifyCode(null);
        User savedUser = userRepository.save(user);
        return savedUser.isVerified() && savedUser.isActive() && StringUtils.isBlank(savedUser.getEmailVerifyCode());
    }

    private boolean isVerificationExpired(Date registrationDate) {
        if (registrationDate == null) {
            return false;
        }
        Date today = new Date();
        return today.getTime() - registrationDate.getTime() > EMAIL_VERIFY_EXPIRATION_LIMIT;
    }

    private Optional<User> getExistingUserWithSameEmail(User user, boolean update) {
        LOG.debug("Searching for user. email = {}, userId = {}", user.getEmail(), user.getId());
        Optional<User> existingUserOptional;
        if (update) {
            existingUserOptional = this.userRepository.findByIdIsNotAndEmailIgnoreCase(user.getId(), user.getEmail());
        } else {
            existingUserOptional = this.userRepository.findByEmailIgnoreCase(user.getEmail());
        }
        return existingUserOptional;
    }
}
