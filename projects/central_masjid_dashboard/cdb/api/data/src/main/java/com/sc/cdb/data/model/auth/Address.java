package com.sc.cdb.data.model.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    // @NotBlank
    private String street;
    // @NotBlank
    private String city;
    // @NotBlank
    private String state;
    // @NotBlank
    private String zip;
    private String longitude;
    private String latitude;
}
