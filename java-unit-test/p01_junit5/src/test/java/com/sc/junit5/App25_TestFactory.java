package com.sc.junit5;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;

import java.util.stream.Stream;


class App25_TestFactoryTest {

    /**
     * @TestFactory is used to test collection or stream of DynamicTest
     *
     * @return
     */

    @TestFactory
    Stream<DynamicTest> test01() {
        Stream<int[]> inputs = Stream.of(new int[]{1, 2},
                new int[]{2, 4},
                new int[]{3, 6});

        return inputs.map(i -> DynamicTest.dynamicTest(
                "doubleIt: " + i[0] + "=" + i[1],
                () -> Assertions.assertEquals(i[1], doubleIt(i[0]))
        ));
    }

    // Method under test
    int doubleIt(int num) {
        return num * 2;
    }
}
