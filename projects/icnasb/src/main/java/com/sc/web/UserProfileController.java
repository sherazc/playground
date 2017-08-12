package com.sc.web;

import com.sc.dao.UserDao;
import com.sc.domain.Role;
import com.sc.domain.User;
import com.sc.util.WebUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.inject.Inject;
import javax.inject.Named;

@Controller
public class UserProfileController {

    @Inject
    @Named("userDao")
    private UserDao userDao;

    @RequestMapping("/register")
    public ModelAndView registerUser() {
        ModelAndView modelAndView = new ModelAndView("register");
        modelAndView.addObject("userCommand", new User());
        modelAndView.addObject("allRoles", Role.getAllRoles());
        return modelAndView;
    }

    @RequestMapping("/register-submit")
    public ModelAndView registerUserSubmit(User user) {
        ModelAndView modelAndView = new ModelAndView("registration-confirmation");
        userDao.insert(user);
        return modelAndView;
    }

    @RequestMapping("/update-profile")
    public ModelAndView updateUser() {
        ModelAndView modelAndView = new ModelAndView("register");
        User loggedInUser = WebUtils.loggedInUser();
        if (loggedInUser != null && StringUtils.isNotBlank(loggedInUser.getId())) {
            User dbUser = userDao.findById(loggedInUser.getId());
            modelAndView.addObject("userCommand", dbUser);
        }

        modelAndView.addObject("allRoles", Role.getAllRoles());

        return modelAndView;
    }
}
