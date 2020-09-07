package com.sc.rp.app.system.model;

import com.sc.rp.data.system.entity.Bank;
import com.sc.rp.data.system.entity.Company;
import com.sc.rp.data.system.entity.CompanyUser;
import lombok.Data;

@Data
public class SignupResponse {
    private Company company;
    private CompanyUser companyUser;
    private Long pricingPlanId;
    private Bank bank;
}
