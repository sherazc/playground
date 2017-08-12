package com.sc.springboot.services;

import com.sc.springboot.domain.Person;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonService {
    private List<Person> persons;

    public PersonService() {
        persons = new ArrayList<>();
        persons.add(new Person(10, "Sheraz"));
        persons.add(new Person(20, "Tariq"));
        persons.add(new Person(30, "Chaudhry"));
    }

    public List<Person> getAll() {
        return persons;
    }
}
