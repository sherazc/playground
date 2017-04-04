package com.sc.web;

import com.sc.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

    private static final Logger LOG = LoggerFactory.getLogger(HomeController.class);

    @RequestMapping({"/", "/home"})
    public ModelAndView home(@RequestParam(value = "auth-error", required = false) String error,
                             @RequestParam(value = "logout", required = false) String logout) {
        LOG.debug("Home Page");
        ModelAndView model = new ModelAndView("home");
        model.addObject("userCommand", new User());
        if (error != null) {
            model.addObject("authError", "Invalid user or password!");
        }

        if (logout != null) {
            model.addObject("logoutMessage", "You've been logged out successfully.");
        }

        return model;
    }

    @RequestMapping({"/redirect"})
    @PreAuthorize("permitAll()")
    public ModelAndView redirectPage(@RequestParam("page") String page) {
        ModelAndView modelAndView = new ModelAndView("redirect:" + page);
        return modelAndView;
    }
}

