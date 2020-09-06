package com.sc.rp.app.system.service.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.sc.rp.data.system.entity.Company;
import com.sc.rp.data.system.entity.CompanyUser;
import com.sc.rp.data.system.repository.CompanyRepository;
import com.sc.rp.data.system.repository.CompanyUserRepository;
import com.sc.rp.lib.common.ValidatorUtils;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.StringUtils;

@AllArgsConstructor
public class UniqueUserEmailValidator implements ConstraintValidator<UniqueUserEmail, CompanyUser> {

    private CompanyUserRepository companyUserRepository;

    @Override
    public boolean isValid(CompanyUser user, ConstraintValidatorContext context) {
        if (user == null || StringUtils.isBlank(user.getEmail())) {
            return true;
        }

        boolean exists = companyUserRepository.existsByEmailIgnoreCase(user.getEmail());
        if (exists) {
            ValidatorUtils.addPropertyNode(context, "email");
            return false;
        } else {
            return true;
        }
    }
}
