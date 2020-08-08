package com.sc.rp.app.system.controller;

import javax.validation.Valid;

import com.sc.rp.app.system.model.SignupRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SignupController {

    private String test;

    @GetMapping("/signup")
    public ModelAndView signUp() {
        ModelAndView modelAndView = new ModelAndView("signup");
        SignupRequest signupRequest = new SignupRequest();
        modelAndView.addObject("signupRequest", signupRequest);
        return modelAndView;
    }

    @PostMapping("/signup")

    public String signUpSubmit(@Valid @ModelAttribute SignupRequest signupRequest, BindingResult errors, Model model) {
        model.addAttribute("signupRequest", signupRequest);
        return "signup";
    }
}
