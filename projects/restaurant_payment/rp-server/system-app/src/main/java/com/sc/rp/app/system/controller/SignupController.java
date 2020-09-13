package com.sc.rp.app.system.controller;

import javax.validation.Valid;

import com.sc.rp.app.system.model.SignupRequest;
import com.sc.rp.app.system.model.SignupResponse;
import com.sc.rp.app.system.service.PricingPlanService;
import com.sc.rp.app.system.service.SignupService;
import com.sc.rp.data.system.entity.CompanyUser;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@AllArgsConstructor
public class SignupController {

    private SignupService signupService;
    private PricingPlanService pricingPlanService;

    @GetMapping("/signup")
    public String signUp(Model model) {
        SignupRequest signupRequest = new SignupRequest();
        signupRequest.setCompanyUser(new CompanyUser());
        model.addAttribute("signupRequest", signupRequest);
        populateSignupModel(model);
        return "signup";
    }

    @PostMapping("/signup")
    public String signUpSubmit(@Valid @ModelAttribute SignupRequest signupRequest, BindingResult errors, Model model) {
        model.addAttribute("signupRequest", signupRequest);
        if (errors.hasErrors()) {
            populateSignupModel(model);
            return "signup";
        } else {
            SignupResponse signupResponse = signupService.signup(signupRequest);
            model.addAttribute("signupResponse", signupResponse);
            return "signup-confirm";
        }
    }

    private void populateSignupModel(Model model) {
        model.addAttribute("pricingPlans", pricingPlanService.findAllActive());
    }
}
