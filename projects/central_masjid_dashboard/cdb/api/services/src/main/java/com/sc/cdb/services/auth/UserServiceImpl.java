package com.sc.cdb.services.auth;

import com.sc.cdb.data.common.util.Constants;
import com.sc.cdb.data.dao.UserDao;
import com.sc.cdb.data.model.auth.Company;
import com.sc.cdb.data.model.auth.User;
import com.sc.cdb.data.model.auth.UserCompany;
import com.sc.cdb.data.repository.UserRepository;
import com.sc.cdb.services.email.EmailService;
import com.sc.cdb.services.model.ServiceResponse;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class UserServiceImpl implements UserService {
    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private CompanyService companyService;
    private UserDao userDao;
    private EmailService emailService;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
                           CompanyService companyService, UserDao userDao,
                           @Qualifier("asyncEmailService") EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.companyService = companyService;
        this.userDao = userDao;
        this.emailService = emailService;
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
                    user.getEmail());
        } else {
            successMessage = MessageFormat.format(
                    "User {0} successfully created.",
                    user.getEmail());
            sendConfirmationEmail(user);
        }
        LOG.debug(successMessage);
        return builder.build().accept(successMessage);
    }

    private void sendConfirmationEmail(User user) {
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("name", user.getFirstName());
        attributes.put("confirmation_link", "https://www.masjiddashboard.com/");

        emailService.send(
                "donotreply@masjiddashboard.com",
                user.getEmail(),
                "Registration Confirmation",
                "registration_confirmation",
                attributes);
    }

    private boolean isPasswordAlreadyEncoded(String password) {
        return StringUtils.isNotBlank(password) && password.startsWith("$2");
    }

    @Override
    public List<UserCompany> findAllCompanyUsers(String companyId) {
        if (Constants.COLLECTION_ALL.equalsIgnoreCase(companyId)) {
            return this.userDao.findAllUserCompany();
        } else {
            return this.userDao.findUserCompanyByCompanyId(companyId);
        }
    }

    @Override
    public Optional<User> findById(String userId) {
        return this.userRepository.findById(userId);
    }

    @Override
    public Optional<User> findCompanyUser(String companyId, String userId) {
        LOG.debug("Searching for user. companyId = {}, userId = {}", companyId, userId);
        if (StringUtils.isBlank(companyId) || StringUtils.isBlank(userId)) {
            LOG.warn("Can not search for user. Bad arguments. companyId = {}, userId = {}", companyId, userId);
            return Optional.empty();
        }
        return this.userRepository.findByCompanyIdAndId(companyId, userId);
    }

    private Optional<User> getExistingUserWithSameEmail(User user, boolean update) {
        LOG.debug("Searching for user. email = {}, userId = {}", user.getEmail());
        Optional<User> existingUserOptional;
        if (update) {
            existingUserOptional = this.userRepository.findByIdIsNotAndEmailIgnoreCase(user.getId(), user.getEmail());
        } else {
            existingUserOptional = this.userRepository.findByEmailIgnoreCase(user.getEmail());
        }
        return existingUserOptional;
    }
}
