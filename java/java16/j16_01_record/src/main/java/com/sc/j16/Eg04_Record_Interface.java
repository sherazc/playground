package com.sc.j16;

/**
 * Records are final.
 * <p>
 * Records can not extend from a class and class can not extend from record.
 * <p>
 * Records can implement an interface.
 * <p>
 * Implemented interface methods in record must be public. Because there is inheritance allowed.
 * So not protected or friendly access is allowed either.
 */
public class Eg04_Record_Interface {
    public static void main(String[] args) {

        interface A {
            int x();

            int plus1();
        }

        // int x(); is implicitly implemented
        record B(int x, int y) implements A {
            public int plus1() {
                return x + 1;
            }
        }


        var a = new B(1, 2);

        System.out.println(a);
        System.out.println(a.x); // NOTE: private access is allowed here.
        System.out.println(a.x());
        System.out.println(a.plus1());
    }
}
