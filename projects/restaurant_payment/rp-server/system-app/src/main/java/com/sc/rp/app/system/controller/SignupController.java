package com.sc.rp.app.system.controller;

import javax.validation.Valid;

import com.sc.rp.app.system.model.SignupRequest;
import com.sc.rp.data.system.entity.CompanyUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SignupController {

    @GetMapping("/signup")
    public ModelAndView signUp() {
        ModelAndView modelAndView = new ModelAndView("signup");
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setCompanyUser(new CompanyUser());
        modelAndView.addObject("signupRequest", signupRequest);
        return modelAndView;
    }

    @PostMapping("/signup")
    public String signUpSubmit(@Valid @ModelAttribute SignupRequest signupRequest, BindingResult errors, Model model) {
        model.addAttribute("signupRequest", signupRequest);
        if (errors.hasErrors()) {
            return "signup";
        } else {
            return "signup-confirm";
        }
    }
}
