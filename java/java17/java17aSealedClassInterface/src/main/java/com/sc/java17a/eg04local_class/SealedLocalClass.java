package com.sc.java17a.eg04local_class;

/**
 * Local classes are not allowed to be extended by sealed class
 */

sealed public class SealedLocalClass {

    public void doWork() {
        // class LocalChild extends SealedLocalClass { } // Not allowed
    }
}

final class ChildClass extends SealedLocalClass {
}