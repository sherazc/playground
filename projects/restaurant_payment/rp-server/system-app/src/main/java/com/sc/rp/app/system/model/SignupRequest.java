package com.sc.rp.app.system.model;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.sc.rp.app.system.service.validator.UniqueCompany;
import com.sc.rp.app.system.service.validator.UniqueUserEmail;
import com.sc.rp.data.system.entity.Bank;
import com.sc.rp.data.system.entity.Company;
import com.sc.rp.data.system.entity.CompanyUser;
import lombok.Data;

@Data
public class SignupRequest {
    @Valid
    @UniqueCompany
    private Company company;

    @Valid
    @UniqueUserEmail
    private CompanyUser companyUser;

    // @NotNull
    // @Min(1)
    private Long pricingPlanId;

    @Valid
    private Bank bank;
}
