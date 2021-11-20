package com.sc.junit4;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;

// NOTE: JUnit4 classes and methods must be public
@RunWith(Suite.class)
@Suite.SuiteClasses({
        J4App01_Suite_ClassATest.class,
        J4App01_Suite_ClassBTest.class
})
public class J4App01_Suite {
}


