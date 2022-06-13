package com.sc.java17a.eg05instanceof;

public class InstanceofJdk16 {

    public static void main(String[] args) {
        InstanceofJdk16 instanceofJdk16 = new InstanceofJdk16();

        // The only way this will return true if class signature is like this:
        // class C16 extends B16 implements A16{}
        System.out.println(instanceofJdk16.isA16aB16(new C16()));
    }

    public boolean isA16aB16(A16 a16) {

        // NOTE: B16 class never implemented A16 interface
        // Seems like it would never return true
        // Also note there are no Compilation error
        // boolean a = a16 instanceof String // Compilation error
        return a16 instanceof B16;
    }
}

interface A16 {
}

class B16 {
}

class C16 extends B16 implements A16 {
}