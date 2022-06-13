package com.sc.java17a.eg05instanceof;

public class InstanceofJdk17 {

    public static void main(String[] args) {
        InstanceofJdk17 instanceofJdk17 = new InstanceofJdk17();

        System.out.println(instanceofJdk17.isA17aB17(new C17()));
    }

    public boolean isA17aB17(A17 a17) {

        // In Java17 this is a compilation error. Because of sealed class compiler
        // recognizes that a17 can never be instanceof B17

        // return a17 instanceof B17;

        return true;
    }
}
sealed interface A17 permits C17 {}
class B17 {}
final class C17 implements A17 {}
