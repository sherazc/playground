package com.sc.rp.app.system.service.validator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Constraint(validatedBy = UniqueCompanyValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD })
public @interface UniqueCompany {
    String message() default "{error.company.unique}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default{};
}
