package com.sc.dp.observer;

public class PostMail implements Observer {
    @Override
    public void update(String name) {
        System.out.println("PostMail received = " + name);
    }
}
