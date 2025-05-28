package com.sc.kafka04.exception;

import com.sc.kafka04.dto.MyErrorResponse;
import lombok.Data;

@Data
public class MyException extends RuntimeException {

  public final MyErrorResponse myErrorResponse;
  public MyException(String message) {
    super(message);
    myErrorResponse = new MyErrorResponse(message, null, null);
  }

  public MyException(MyErrorResponse myErrorResponse) {
    super(myErrorResponse.message());
    this.myErrorResponse = myErrorResponse;
  }
}
