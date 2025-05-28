package com.sc.kafka04.validator;

import com.sc.kafka04.dto.RegisterUserRecord;
import com.sc.kafka04.repository.RegisterUserRepo;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class RegisterUserValidator implements Validator {

  private final RegisterUserRepo registerUserRepo;

  public RegisterUserValidator(RegisterUserRepo registerUserRepo) {
    this.registerUserRepo = registerUserRepo;
  }

  @Override
  public boolean supports(Class<?> clazz) {
    return RegisterUserRecord.class.isAssignableFrom(clazz);
  }

  @Override
  public void validate(Object target, Errors errors) {
    RegisterUserRecord registerUserRecord = (RegisterUserRecord) target;

    registerUserRepo.findByUserName(registerUserRecord.userName())
        .ifPresent(registerUser ->
            errors.rejectValue("userName", "400",
                String.format("User name %s already exist", registerUser.getUserName()))
        );
  }
}
