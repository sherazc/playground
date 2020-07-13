package com.sc.rp.data.system.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Company {
    @Id
    private Long id;
    private String name;
}
