package com.sc.rp.app.system.service.validator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Constraint(validatedBy = UniqueUserEmailValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.FIELD })
public @interface UniqueUserEmail {
    String message() default "{error.user.email.unique}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default{};
}
