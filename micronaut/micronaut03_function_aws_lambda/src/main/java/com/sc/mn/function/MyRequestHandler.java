package com.sc.mn.function;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

public class MyRequestHandler implements RequestHandler<String, String> {
    @Override
    public String handleRequest(String s, Context context) {
        return "Hello World";
    }
}
