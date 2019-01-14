package com.sc.cdb.webservices.decorator;

import com.sc.cdb.services.model.ServiceResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.List;

@Component
public class ErrorResponseDecorator {
    private static final Logger LOG = LoggerFactory.getLogger(ErrorResponseDecorator.class);

    public ServiceResponse rejectBindingErrors(ServiceResponse serviceResponse, List<ObjectError> bindingErrors) {
        if (serviceResponse == null || bindingErrors == null) {
            return serviceResponse;
        }
        bindingErrors
                .forEach(e -> {
                    StringBuilder fieldName = new StringBuilder(e.getObjectName()).append('.');
                    if (e instanceof FieldError) {
                        fieldName.append(((FieldError)e).getField());
                    }
                    serviceResponse.rejectField(fieldName.toString(), e.getDefaultMessage());
                });
        return serviceResponse;
    }
}
