package com.sc.rp.app.system.service.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.sc.rp.data.system.entity.Company;
import com.sc.rp.data.system.repository.CompanyRepository;
import com.sc.rp.lib.common.ValidatorUtils;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UniqueCompanyValidator implements ConstraintValidator<UniqueCompany, Company> {

    private CompanyRepository companyRepository;

    @Override
    public boolean isValid(Company company, ConstraintValidatorContext context) {
        ValidatorUtils.addPropertyNode(context, "name");
        return false;
    }
}
