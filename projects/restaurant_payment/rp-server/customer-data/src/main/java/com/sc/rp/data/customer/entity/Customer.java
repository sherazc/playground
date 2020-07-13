package com.sc.rp.data.customer.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Customer {
    @Id
    private Long id;
    private String name;
}
