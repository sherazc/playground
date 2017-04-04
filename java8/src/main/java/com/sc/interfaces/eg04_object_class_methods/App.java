package com.sc.interfaces.eg04_object_class_methods;

interface I {
    /*
    In interfaces we can't override Object class methods
    like we can do in Abstract or Concrete class.

    The method below will give compilation error
    default boolean equals(Object obj) {
        return true;
    }
    */
}

class C {
    // This would not work in interfaces
    public boolean equals(Object obj) {
        return true;
    }
}

public class App {}
