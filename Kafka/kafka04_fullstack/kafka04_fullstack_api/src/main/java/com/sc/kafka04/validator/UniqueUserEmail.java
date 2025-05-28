package com.sc.kafka04.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Constraint(validatedBy = UniqueUserEmailValidator.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUserEmail {
  String message() default "User email not unique";
  Class<?>[] groups() default {};
  Class<? extends Payload>[] payload() default {};
}
