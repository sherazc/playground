package com.sc.lambda.eg10_method_reference;

/*
Parameter as target Method Reference: No Parameters:
Instead of passing through parameters to another function,
we are calling function of the first received parameter.
*/
import java.util.Arrays;
import java.util.List;

public class App04ParameterAsTargetNoParameters {
    public static void main(String[] args) {
        List<ChaudhryFamilyMember> chaudhryFamilyMembers = Arrays.asList(
                new ChaudhryFamilyMember("Sheraz"),
                new ChaudhryFamilyMember("Abrar")

        );

        /*
        In the lambda below we are just calling function of the first parameter.
         */
        chaudhryFamilyMembers.forEach(c -> c.printFullName());

        /*
        Line below is instance method reference not a static method reference.

        In forEach Method we know that each element is of type ChaudhryFamilyMember.
        And we want to call printFullName on each element.

        In previous examples we where passing parameters to another method. But
        here we are calling a method of parameter.
        */
        chaudhryFamilyMembers.forEach(ChaudhryFamilyMember::printFullName);
    }

    static class ChaudhryFamilyMember {
        private String firstName;

        public ChaudhryFamilyMember(String firstName) {
            this.firstName = firstName;
        }

        public void printFullName() {
            System.out.println(this.firstName + " Chaudhry");
        }
    }
}
