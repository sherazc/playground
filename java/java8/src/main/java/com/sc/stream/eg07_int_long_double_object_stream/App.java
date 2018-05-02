package com.sc.stream.eg07_int_long_double_object_stream;

import java.util.Arrays;
import java.util.List;
import java.util.stream.DoubleStream;
import java.util.stream.IntStream;
import java.util.stream.LongStream;
import java.util.stream.Stream;

/*
Stream's map*() methods loops over datasource. Return type from map's lambda returns
a transformed stream.

In the example below we are creating int, double, long and Object Stream.
Each type of these Streams have method their own unique methods
*/

public class App {

    public static void main(String[] args) {
        IntStream intAgeStream = makePersonList().stream().mapToInt(p -> p.age);
        DoubleStream doubleSalaryStream = makePersonList().stream().mapToDouble(p -> p.salary);
        LongStream longIdStream = makePersonList().stream().mapToLong(p -> p.id);
        Stream<String> stringNameStream = makePersonList().stream().map(p -> p.name);

        /*
        getAsInt() is used because max() returns an optional.

        We should have used isPresent() in case it returns a null
         */
        System.out.println("Max age: " + intAgeStream.max().getAsInt());
        System.out.println("Total Salary: " + doubleSalaryStream.sum());
        System.out.println("Total Persons: " + longIdStream.count());
        stringNameStream.forEach(System.out::print);
    }


    private static List<Person> makePersonList() {
        return Arrays.asList(
                new Person(100, "Sheraz", 10, 1000.1),
                new Person(200, "Tariq", 20, 2000.2),
                new Person(300, "Chaudhry", 30, 3000.3)
        );
    }

    static class Person {
        String name;
        long id;
        int age;
        double salary;

        Person(long id, String name, int age, double salary) {
            this.name = name;
            this.id = id;
            this.age = age;
            this.salary = salary;
        }
    }
}
