package com.sc.lambda.eg03_functional_interface;

/*
Interfaces that could be used as with lambda should only have
one method signature.

Optionally on lambda interfaces we can add @FunctionalInterface
annotation. By doing that if we add second method in the interface
then we will get compilation error
*/
@FunctionalInterface
interface MyLambdaInterface {
    void doStuff();

    /*
    adding another function will cause compilation error on the interface
    */
    //void moreStuff();
}

public class App {

    public static void main(String[] args) {
        MyLambdaInterface myLambdaInterface = () -> System.out.println("Functional interface Working");

        myLambdaInterface.doStuff();
    }
}



