package com.sc.junit.hamcrest;

import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

class Eg01_assertThat_Test {

    @Test
    void matchBoolean() {
        // org.junit.Assert used to have expected then actual
        // org.hamcrest.MatcherAssert is opposite
        // it has actual and then expected org.hamcrest.Matcher
        MatcherAssert.assertThat(true, Matchers.is(true));
        MatcherAssert.assertThat(false, Matchers.is(false));
    }

    @Test
    void matchObjectNull() {
        MatcherAssert.assertThat(null, Matchers.nullValue());
        MatcherAssert.assertThat(new Object(), Matchers.notNullValue());
    }

    @Test
    void matchObjectEqual() {
        Integer actual = 9;
        Integer expected = 9;
        MatcherAssert.assertThat(actual, Matchers.is(expected));
    }

    @Test
    void matchObjectNotEqual() {
        Integer actual = 9;
        Integer expected = 4;
        MatcherAssert.assertThat(actual, Matchers.not(expected));
    }

    @Test
    void matchObjectSameInstance() {
        Integer actual = 9;
        Integer expected = actual;
        MatcherAssert.assertThat(actual, Matchers.sameInstance(expected));
    }

    @Test
    void matchMixMatcher() {
        Integer actual = 9;
        Integer expected = 4;
        MatcherAssert.assertThat(actual,
                Matchers.not(Matchers.sameInstance(expected)));
    }

    @Test
    void matchArrays() {
        int[] a1 = new int[] {1,2};
        int[] e1 = new int[] {1,2};
        MatcherAssert.assertThat(a1, Matchers.is(e1));

        int[] a2 = new int[0];
        int[] e2 = new int[0];
        MatcherAssert.assertThat(a2, Matchers.is(e2));

        int[] a3 = null;
        int[] e3 = null;
        MatcherAssert.assertThat(a3, Matchers.is(e3));
    }

    @Test
    void matchLists() {
        List<Integer> list1 = Arrays.asList(1, 2);
        List<Integer> list2 = Arrays.asList(1, 2);
        MatcherAssert.assertThat(list1, Matchers.hasSize(2));
        // match single element
        MatcherAssert.assertThat(list1, Matchers.hasItem(1));
        // Order matters
        MatcherAssert.assertThat(list1, Matchers.contains(1, 2));
        // Order do not matter
        MatcherAssert.assertThat(list1, Matchers.containsInAnyOrder(2, 1));
        // Negative match
        MatcherAssert.assertThat(list1, Matchers.not(Matchers.hasItem(3)));
        // Match 2 lists
        MatcherAssert.assertThat(list1, Matchers.is(list2));
    }

    @Test
    void matchMaps() {
        Map<String, String> map1 = Map.of(
                "k1", "v1",
                "k2", "v2");
        // match key
        MatcherAssert.assertThat(map1, Matchers.hasKey("k1"));
        MatcherAssert.assertThat(map1, Matchers.not(Matchers.hasKey("k3")));

        // match key value
        MatcherAssert.assertThat(map1, Matchers.hasEntry("k2", "v2"));
    }
}
