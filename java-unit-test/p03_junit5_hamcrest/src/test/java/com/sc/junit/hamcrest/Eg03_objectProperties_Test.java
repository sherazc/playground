package com.sc.junit.hamcrest;

import com.sc.junit.hamcrest.model.Address;
import com.sc.junit.hamcrest.model.Employee;
import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

class Eg03_objectProperties_Test {

    private Employee employee;

    @BeforeEach
    void beforeEach() {
        Address a1 = new Address("c1", 100);
        Address a2 = new Address("c2", 100);
        employee = new Employee("f1", "l1", List.of(a1, a2));
    }

    @Test
    void matchPropertyName() {
        MatcherAssert.assertThat(employee,
                Matchers.hasProperty("firstName"));
    }

    // NOTE: Name and Value match only works with public classes
    @Test
    void matchPropertyNameAndValue() {
        MatcherAssert.assertThat(employee,
                Matchers.hasProperty("firstName",
                        Matchers.is("f1")));
    }

    @Test
    void matchListPropertyName() {
        MatcherAssert.assertThat(employee.getAddresses(), // list to match
                Matchers.hasItem( // Check each element
                        Matchers.hasProperty("city")));
    }

    @Test
    void matchListPropertyNameAndValue() {
        MatcherAssert.assertThat(employee.getAddresses(), // list to match
                Matchers.hasItem( // Check each element
                        Matchers.hasProperty("zip", Matchers.is(100))));
    }
}