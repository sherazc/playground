package com.sc.cdb.data.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company extends BaseModel {
    @Id
    private String id;
    @NotNull
    private String name;
    @Valid
    private Address address;
    private String icon;
}
