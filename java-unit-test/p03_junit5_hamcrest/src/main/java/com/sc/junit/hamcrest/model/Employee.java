package com.sc.junit.hamcrest.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    private String firstName, lastName;
    private List<Address> addresses;
}

