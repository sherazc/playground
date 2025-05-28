package com.sc.kafka04.config;

import com.sc.kafka04.dto.MyErrorResponse;
import com.sc.kafka04.exception.MyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.stream.Collectors;

@ControllerAdvice
public class MyGlobalExceptionHandler {

  @ExceptionHandler(MyException.class)
  public ResponseEntity<MyErrorResponse> handleMyException(MyException e) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMyErrorResponse());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<MyErrorResponse> handleException(MethodArgumentNotValidException exception) {

    BindingResult bindingResult = exception.getBindingResult();

    String errorMessage = bindingResult.getFieldErrors().stream()
        .map(f -> f.getField() + ":" + f.getDefaultMessage())
        .collect(Collectors.joining(","));

    String fields = bindingResult.getFieldErrors().stream()
        .map(FieldError::getField)
        .collect(Collectors.joining("."));

    MyErrorResponse errorResponse = new MyErrorResponse(
        String.format("Invalid Request: %s", errorMessage),
        fields,
        "400");

    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(errorResponse);
  }
}
