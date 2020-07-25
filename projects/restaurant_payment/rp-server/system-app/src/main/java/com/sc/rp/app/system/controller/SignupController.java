package com.sc.rp.app.system.controller;

import com.sc.rp.app.system.model.SignupRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class SignupController {

    @GetMapping("/signup")
    public String signUp() {
        return "signup";
    }

    @PostMapping("/signup")
    public String signUpSubmit(SignupRequest signupRequest, Model model) {
        model.addAttribute("signupRequest", signupRequest);
        return "signup";
    }
}
