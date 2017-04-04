package com.sc.lambda.eg01_lambda;

public class App {
    private static void printGreet(MyLambdaInterface myLambdaInterface) {
        System.out.println(myLambdaInterface.greet());;
    }

    public static void main(String[] args) {
        // Passing interface using class implementation
        MyLambdaInterface myLambdaInterfaceImpl = new MyLambdaInterfaceImpl();
        printGreet(myLambdaInterfaceImpl);

        // Passing interface using anonymous class
        MyLambdaInterface myLambdaInterfaceAnonymous = new MyLambdaInterface() {
            @Override
            public String greet() {
                return "Hello MyLambdaInterface anonymous class";
            }
        };
        printGreet(myLambdaInterfaceAnonymous);

        // Passing interface using Lambda
        MyLambdaInterface myLambdaInterfaceInline = () -> "Hello MyLambdaInterface lambda";
        printGreet(myLambdaInterfaceInline);

        // Passing interface using in-line Lambda
        printGreet(() -> "Hello MyLambdaInterface in line lambda");
    }
}

interface MyLambdaInterface {
    String greet();
}

class MyLambdaInterfaceImpl implements MyLambdaInterface {

    @Override
    public String greet() {
        return "Hello MyLambdaInterface Concrete class";
    }
}
