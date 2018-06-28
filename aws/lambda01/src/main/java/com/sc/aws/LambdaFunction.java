package com.sc.aws;

import com.amazonaws.services.lambda.runtime.Context;

public class LambdaFunction {


    public User lambdaReturnUser(Context context) {
        User user = null;
        if (user == null) {
            user = new User();
        }
        user.setId(System.currentTimeMillis());
        user.setFirstName("Sheraz");
        user.setLastName("Chaudhry");
        return user;
    }

    public String lambdaReturnHelloWorld(Context context) {
        return "Hello Sheraz";
    }

}
