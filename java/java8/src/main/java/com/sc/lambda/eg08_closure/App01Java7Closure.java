package com.sc.lambda.eg08_closure;

/*
Example below shows partial support of closure in Java 7
*/
public class App01Java7Closure {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;

        doProcess(a, new Process() {
            @Override
            public void execute(int i) {

                /*
                We can not change value of variable b and we will get error below:
                (local variables referenced from an inner class must be final or effectively final)

                Compiler considers, in the scope of execute(), variable defined outside are final.
                Optionally we can add final keyword

                In a real functional programming language we would be able to. But in Java 7 we can
                still use it.
                */
                // b = 30;
                System.out.println(i + b);
            }
        });

        /*
        Compiler will even complain if we change value outside of anonymous class.
        Once an outside variable is used inside an anonymous class then compiler
        makes it final even if we don't use keyword final.
        */
        // b = 40;

        /*
        But we can change value of "a" because value of "a" is passed in execute().
        Look at method definition of doProcess()
        */
        a = 50;

    }

    private static void doProcess(int i, Process process) {
        process.execute(i);
    }

    interface Process {
        void execute(int i);
    }
}
