package com.sc.cdb.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    private String id;
    @NotNull
    private String name;
    private Address address;
    private String icon;
}
