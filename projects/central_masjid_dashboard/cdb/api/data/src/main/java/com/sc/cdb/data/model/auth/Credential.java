package com.sc.cdb.data.model.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Credential {
    @NotBlank
    private String email;
    private String existingCredential;
    @NotBlank
    private String newCredential;
}
