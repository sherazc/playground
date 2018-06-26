package com.sc.aws;

import com.amazonaws.services.lambda.runtime.Context;

public class LambdaFunction {


    public User lambda(User user, Context context) {
        if (user == null) {
            return null;
        }



        return user;
    }

    public static void main(String[] args) {
        User user = User.builder().firstName("test first name").build();

        System.out.println(user);
    }
}
