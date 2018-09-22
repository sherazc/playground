package com.sc.cdb.services.model;

import com.sc.cdb.data.model.Company;
import com.sc.cdb.data.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyRegisterModel {
    @NotNull
    private Company company;
    @NotNull
    private User adminUser;
}
