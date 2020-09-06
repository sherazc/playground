package com.sc.rp.app.system.service.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.sc.rp.data.system.entity.Company;
import com.sc.rp.data.system.repository.CompanyRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UniqueCompanyValidator implements ConstraintValidator<UniqueCompany, Company> {

    private CompanyRepository companyRepository;

    @Override
    public boolean isValid(Company company, ConstraintValidatorContext context) {
        System.out.println(company);

        boolean valid = false;
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                .addPropertyNode( "name" ).addConstraintViolation();


        return false;
    }
}
