package com.sc.rp.app.system.service.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.sc.rp.data.system.entity.Company;
import com.sc.rp.data.system.repository.CompanyRepository;
import com.sc.rp.lib.common.ValidatorUtils;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;

@AllArgsConstructor
public class UniqueCompanyValidator implements ConstraintValidator<UniqueCompany, Company> {

    private CompanyRepository companyRepository;

    @Override
    public boolean isValid(Company company, ConstraintValidatorContext context) {
        if (company == null || StringUtils.isBlank(company.getName())) {
            return true;
        }

        boolean companyExists = companyRepository.existsByNameIgnoreCase(company.getName());
        if (companyExists) {
            ValidatorUtils.addPropertyNode(context, "name");
            return false;
        } else {
            return true;
        }
    }
}
