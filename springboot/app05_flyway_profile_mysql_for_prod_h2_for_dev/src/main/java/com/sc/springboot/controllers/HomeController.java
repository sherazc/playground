package com.sc.springboot.controllers;

import com.sc.springboot.dao.PersonDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @Autowired
    private PersonDao personDao;
    @RequestMapping("/")
    public String getIndex(Model model) {
        model.addAttribute("persons", personDao.getAll());
        return "home";
    }
}
