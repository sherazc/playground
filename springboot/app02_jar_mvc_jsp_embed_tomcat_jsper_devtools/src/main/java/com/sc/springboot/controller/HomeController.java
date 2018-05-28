package com.sc.springboot.controller;

import com.sc.springboot.domain.Person;
import com.sc.springboot.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;

@Controller
public class HomeController {

    @Autowired
    private PersonService personService;

    @RequestMapping(value = {"/", "home"})
    public String index(Model model) {
        model.addAttribute("persons", personService.getAll());
        return "home";
    }
}
