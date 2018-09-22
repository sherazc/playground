package com.sc.cdb.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String id;
    @NotNull
    private String companyId;
    @NotNull
    private String email;
    @NotNull
    @JsonIgnore
    private String password;
    private String firstName;
    private String lastName;
    private Boolean active;
}
