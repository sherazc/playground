package com.sc.kafka04.validator;

import com.sc.kafka04.repository.RegisterUserRepo;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UniqueUserEmailValidator implements ConstraintValidator<UniqueUserEmail, String> {

  private final RegisterUserRepo registerUserRepo;

  @Override
  public void initialize(UniqueUserEmail constraintAnnotation) {
  }

  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    return registerUserRepo.findByEmail(value).isEmpty();
  }
}
