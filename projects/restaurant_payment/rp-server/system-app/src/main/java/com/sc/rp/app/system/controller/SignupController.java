package com.sc.rp.app.system.controller;

import com.sc.rp.app.system.model.SignupRequest;
import com.sc.rp.data.system.entity.Company;
import com.sc.rp.data.system.entity.CompanyUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class SignupController {

    @GetMapping("/signup")
    public ModelAndView signUp() {
        ModelAndView modelAndView = new ModelAndView("signup");
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setCompany(new Company());
        signupRequest.setCompanyUser(new CompanyUser());
        modelAndView.addObject("signupRequest", signupRequest);
        return modelAndView;
    }

    @PostMapping("/signup")
    public String signUpSubmit(SignupRequest signupRequest, Model model) {
        model.addAttribute("signupRequest", signupRequest);
        return "signup";
    }
}
