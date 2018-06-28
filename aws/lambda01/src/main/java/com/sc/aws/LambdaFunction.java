package com.sc.aws;

import com.amazonaws.services.lambda.runtime.Context;

public class LambdaFunction {


    public User lambda(Context context) {
        User user = null;
        if (user == null) {
            user = new User();
        }
        user.setId(System.currentTimeMillis());
        user.setFirstName("Sheraz");
        user.setLastName("Chaudhry");
        return user;
    }

    public static void main(String[] args) {
        LambdaFunction lambdaFunction = new LambdaFunction();
        // System.out.println(lambdaFunction.lambda(null, null));
    }
}
