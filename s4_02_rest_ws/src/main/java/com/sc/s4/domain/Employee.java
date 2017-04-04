package com.sc.s4.domain;

import java.util.Arrays;
import java.util.List;

public class Employee {

    private long id;
    private String name;
    private int age;
    private List<String> locations;

    public Employee() {
        id = 100;
        name = "name1";
        age = 10;
        locations = Arrays.asList("la");
    }

    public Employee(long id) {
        this.id = id;
        name = "name" + id;
        age = (int) id + 10;
        locations = Arrays.asList("la" + id, "lb" + id, "lc" + id);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public List<String> getLocations() {
        return locations;
    }

    public void setLocations(List<String> locations) {
        this.locations = locations;
    }
}
