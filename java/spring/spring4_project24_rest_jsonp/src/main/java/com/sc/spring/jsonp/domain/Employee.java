package com.sc.spring.jsonp.domain;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.util.Date;
import java.util.List;

/**
 * Created by sheraz on 11/12/15.
 */
public class Employee {
    private Long id;
    private String name;
    private List<String> departments;
    private Double salary;
    private Date hireDate;


    public Employee() {
    }

    public Employee(Long id, String name, List<String> departments, Double salary, Date hireDate) {
        this.id = id;
        this.name = name;
        this.departments = departments;
        this.salary = salary;
        this.hireDate = hireDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getDepartments() {
        return departments;
    }

    public void setDepartments(List<String> departments) {
        this.departments = departments;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public Date getHireDate() {
        return hireDate;
    }

    public void setHireDate(Date hireDate) {
        this.hireDate = hireDate;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this).toString();
    }
}
