package com.sc.rp.lib.common;

import javax.validation.ConstraintValidatorContext;

public class ValidatorUtils {
    private ValidatorUtils() {
    }

    public static void addPropertyNode(ConstraintValidatorContext context, String node) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                .addPropertyNode(node).addConstraintViolation();
    }
}
