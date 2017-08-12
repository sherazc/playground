package com.sc.lambda.eg10_method_reference;

public class App02Constructor {
    public static void main(String[] args) {
        StuffMaker<Person, String, String> personMakerLambda = (fName, lName) -> new Person(fName, lName);
        Person personA = personMakerLambda.build("Sheraz", "Chaudhry");
        System.out.println(personA);

        StuffMaker<Person, String, String> personMakerMethodReference = Person::new;
        Person personB = personMakerMethodReference.build("Abrar", "Chaudhry");
        System.out.println(personB);
    }

    interface StuffMaker<T, A, B> {
        T build(A a, B b);
    }

    static class Person {
        private String firstName;
        private String lastName;

        public Person(String firstName, String lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        @Override
        public String toString() {
            return "Hi I am " + firstName + " " + lastName + ".";
        }
    }
}