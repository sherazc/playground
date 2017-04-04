package com.sc.spring;

import com.sc.spring.dao.UserDao;
import com.sc.spring.domain.Role;
import com.sc.spring.domain.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.inject.Inject;
import javax.inject.Named;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController {

    private static final String MAIN_ERROR_MESSAGE_KEY = "main_error_message";
    private static final String MAIN_WARN_MESSAGE_KEY = "main_warn_message";
    private static final String MAIN_INFO_MESSAGE_KEY = "main_info_message";

    @Inject
    @Named("userDao")
    private UserDao userDao;

    @RequestMapping({"/", "/home"})
    public ModelAndView homePage() {
        return new ModelAndView("home");
    }

    @RequestMapping({"/login"})
    public ModelAndView loginPage() {
        ModelAndView modelAndView = new ModelAndView("login");
        modelAndView.addObject("loginUser", new User());
        return modelAndView;
    }

    @RequestMapping({"/register"})
    public ModelAndView registerPage() {
        ModelAndView modelAndView = new ModelAndView("register");
        modelAndView.addObject("registerUser", new User());

        modelAndView.addObject("allRoles", Role.getAllRoles());
        return modelAndView;
    }

    @RequestMapping(value = {"/register-submit"}, method = RequestMethod.POST)
    public ModelAndView registerSubmitPage(User user) {
        ModelAndView modelAndView = new ModelAndView();
        if (user == null) {
            user = new User();
        }
        if (StringUtils.isBlank(user.getUsername()) || StringUtils.isBlank(user.getPassword())) {
            modelAndView.addObject("allRoles", Role.getAllRoles());
            modelAndView.setViewName("register");
            modelAndView.addObject("registerUser", user);
            modelAndView.addObject(HomeController.MAIN_ERROR_MESSAGE_KEY, "Please enter valid user information.");
        } else {
            User dbUser = userDao.findByUsername(user.getUsername());
            if (dbUser == null) {
                userDao.insert(user);
                modelAndView.addObject("confirmation_message", "Registration complete.");
                modelAndView.addObject(HomeController.MAIN_INFO_MESSAGE_KEY, "Successfully registered.");
                modelAndView.setViewName("confirmation");
            } else {
                modelAndView.addObject("allRoles", Role.getAllRoles());
                modelAndView.setViewName("register");
                modelAndView.addObject("registerUser", user);
                modelAndView.addObject(HomeController.MAIN_WARN_MESSAGE_KEY, "User already exists.");
            }
        }

        return modelAndView;
    }

    @RequestMapping({"/admin"})
    public ModelAndView adminPage() {
        return new ModelAndView("admin");
    }

    @RequestMapping({"/user"})
    public ModelAndView userPage() {
        return new ModelAndView("user");
    }

    @RequestMapping({"/access-denied"})
    public ModelAndView accessDeniedPage() {
        return new ModelAndView("access-denied");
    }

    @RequestMapping({"/confirmation/{type}"})
    public ModelAndView confirmationPage(@PathVariable("type") String type) {

        String message = "Default Message";

        if ("logout".equals(type)) {
            message = "Logged out.";
        } else if ("login_failed".equals(type)) {
            message = "Login Failed.";
        } else if ("sign_in".equals(type)) {
            message = "Signed in.";
        }

        ModelAndView modelAndView = new ModelAndView("confirmation");
        modelAndView.addObject("confirmation_message", message);

        return modelAndView;
    }

    @RequestMapping({"/redirect"})
    public ModelAndView redirectPage(@RequestParam("page") String page) {
        ModelAndView modelAndView = new ModelAndView("redirect:" + page);
        return modelAndView;
    }

    @RequestMapping({"/update-profile"})
    @PreAuthorize("isAuthenticated()")
    public ModelAndView updateProfilePage() {
        ModelAndView modelAndView = new ModelAndView("register");
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        modelAndView.addObject("registerUser", user);
        modelAndView.addObject("allRoles", Role.getAllRoles());
        modelAndView.addObject("updateProfile", true);
        return modelAndView;
    }

    @RequestMapping(value = {"/update-profile-submit"}, method = RequestMethod.POST)
    public ModelAndView updateProfileSubmitPage(User user) {

        User principalUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        principalUser.setPassword(user.getPassword());
        principalUser.setFirstName(user.getFirstName());
        principalUser.setLastName(user.getLastName());
        principalUser.setRoleCodes(user.getRoleCodes());

        userDao.update(principalUser);
        ModelAndView modelAndView = new ModelAndView("confirmation");

        modelAndView.addObject("confirmation_message", "Profile Update complete.");
        modelAndView.addObject(HomeController.MAIN_INFO_MESSAGE_KEY, "Profile Updated.");

        return modelAndView;
    }
}
