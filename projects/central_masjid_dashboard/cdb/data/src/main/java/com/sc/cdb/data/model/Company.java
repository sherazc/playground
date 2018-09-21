package com.sc.cdb.data.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Company {
    @Id
    private String id;
    private String name;
    private Address address;
    private String icon;
}
