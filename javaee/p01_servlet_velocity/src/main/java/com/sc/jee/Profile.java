package com.sc.jee;

import java.util.Date;

public class Profile {
    private String name;
    private String[] cars;
    private int age;
    private double salary;
    private boolean admin;
    private Date dob;

    public Profile(String name, String[] cars, int age, double salary, boolean admin, Date dob) {
        this.name = name;
        this.cars = cars;
        this.age = age;
        this.salary = salary;
        this.admin = admin;
        this.dob = dob;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getCars() {
        return cars;
    }

    public void setCars(String[] cars) {
        this.cars = cars;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }
}