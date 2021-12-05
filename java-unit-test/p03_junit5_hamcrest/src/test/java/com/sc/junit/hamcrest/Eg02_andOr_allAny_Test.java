package com.sc.junit.hamcrest;

import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

import java.util.List;

class Eg02_andOr_allAny_Test {

    // OR logic
    @Test
    void matchAnyOf() {
        MatcherAssert.assertThat(2, Matchers.anyOf(
                Matchers.is(1),
                Matchers.is(2),
                Matchers.is(3)
        ));
    }

    // AND logic
    @Test
    void matchAllOf() {
        List<Integer> nums = List.of(1, 2, 3);
        MatcherAssert.assertThat(nums, Matchers.allOf(
                Matchers.containsInAnyOrder(2, 1, 3),
                Matchers.hasItems(2, 3),
                Matchers.hasItems(3, 1),
                Matchers.contains(1, 2, 3)
        ));
    }

    // AND, OR logic
    @Test
    void matchAllOfAnyOf() {
        String greeting = "Hi, my name is Sheraz";

        // All of these should match
        MatcherAssert.assertThat(greeting, Matchers.allOf(
                Matchers.containsString("Sheraz"),
                Matchers.containsStringIgnoringCase("hi"),
                Matchers.anyOf( // Anyone or more of these should match
                        Matchers.containsString("Chaudhry"),
                        Matchers.containsString("name")
                )
        ));
    }
}