package com.sc.graphql.entity;

import lombok.Data;

@Data
public class EmployeeInput {
    private String name;
    private Double salary;
    private Long departmentId;
}
