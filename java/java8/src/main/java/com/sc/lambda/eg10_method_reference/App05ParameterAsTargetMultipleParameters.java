package com.sc.lambda.eg10_method_reference;

/*
Parameter As Target: Multiple parameter:
If we have to call a function on first parameter and pass rest of of
the parameters to that function then we can use Method Reference.
 */
public class App05ParameterAsTargetMultipleParameters {
    public static void main(String[] args) {
        StringReplacer stringReplacer = new StringReplacer("Sheraz");

        /*
        In the line below we are calling function "replace()" of the first
        parameter "sr" and passing rest of parameters "s1" and "s2" to "replace()"
        */
        ReplaceProcessor replaceProcessorLambda = (sr, s1, s2) -> sr.replace(s1, s2);

        /*
        If we have condition like the one above then we can write method reference like below:

        In the line below we are saying: Call function "replace()" of First parameter type "StringReplacer"
        and pass rest of the parameters (String and String) to it.
        */
        ReplaceProcessor replaceProcessorMethodReference = StringReplacer::replace;


        replaceProcessorLambda.process(stringReplacer, "e", "3");
        System.out.println(stringReplacer);

        replaceProcessorMethodReference.process(stringReplacer, "a", "4");
        System.out.println(stringReplacer);
    }

    interface ReplaceProcessor {
        void process(StringReplacer stringReplacer, String s1, String s2);
    }

    static class StringReplacer {
        private String string;

        public StringReplacer(String string) {
            this.string = string;
        }

        public void replace(String s1, String s2) {
            this.string = this.string.replace(s1, s2);
        }

        @Override
        public String toString() {
            return string;
        }
    }
}
