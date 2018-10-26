package com.sc.cdb.services.model;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Deprecated
public class CompanyRegisterModelDeprecated {
    @NotNull
    @Valid
    private Company company;
    @NotNull
    @Valid
    private User adminUser;
}
