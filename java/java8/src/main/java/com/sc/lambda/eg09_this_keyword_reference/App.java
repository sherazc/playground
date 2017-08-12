package com.sc.lambda.eg09_this_keyword_reference;

/*
"this" keyword in the lambda is as if it is used just out side lambda.
*/
import java.util.function.Consumer;

public class App {
    Consumer<String> consumerLambdaAppClassMember = (name -> {
         System.out.println(this.toString() + name);
    });

    public static void main(String[] args) {

        // Using "this" inside a Anonymous class.
        Consumer<String> consumerAnonymous = new Consumer<String>() {
            @Override
            public void accept(String name) {
                System.out.println(this.toString() + name);
            }

            @Override
            public String toString() {
                return "Anonymous class ";
            }
        };

        /*
        Since we can't use "this" in static main(), so we can't use "this"
        in lambda that is defined in static main()
         */
        Consumer<String> consumerLambdaMain = (name -> {
            // Line below is compilation error.
            // System.out.print(this.toString() + name);
            System.out.println("Can't use this in main() " + name);

        });

        consumerAnonymous.accept("consumerAnonymous");
        consumerLambdaMain.accept("consumerLambdaMain");
        new App().startProcess();
    }

    private void startProcess() {
        Consumer<String> consumerLambdaAppClassPrivateMethod = (name -> {
            System.out.println(this.toString() + name);
        });

        this.consumerLambdaAppClassMember.accept("consumerLambdaAppClassMember");
        consumerLambdaAppClassPrivateMethod.accept("consumerLambdaAppClassPrivateMethod");
    }

    @Override
    public String toString() {
        return "App class ";
    }
}
