package com.sc.springboot.controller;

import com.sc.springboot.domain.Person;
import com.sc.springboot.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PersonSpringRestController {

    @Autowired
    private PersonService personService;

    @RequestMapping(
            value = "/",
            method = RequestMethod.GET,
            produces = "application/json"
    )
    public List<Person> index() {
        return this.personService.getAll();
    }
}