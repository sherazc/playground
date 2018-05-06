package com.sc.stream.eg04_stream_methods;

import java.util.stream.Stream;

public class App {
    public static void main(String[] args) {

        // Find if all elements match - Terminal
        boolean allMatch = Stream.of(2, 4, 6).allMatch(i -> i % 2 == 0);
        System.out.println("allMatch=" + allMatch);

        // Find if any of Stream Element match - Terminal
        boolean anyMatch = Stream.of(2, 4, 6).anyMatch(i -> i == 2);
        System.out.println("anyMatch=" + anyMatch);

        // Concat 2 Streams
        Stream<Integer> concatStream = Stream.concat(Stream.of(1, 2), Stream.of(3, 4));
        System.out.println("========= Stream.concat() ========");
        concatStream.forEach(System.out::println);

        // Count - Terminal
        System.out.println("========= Stream.count() ========");
        System.out.println(Stream.of(2, 4, 6).count());

        // Distinct - Intermediate
        System.out.println("========= Stream.distinct() ========");
        Stream.of(2, 2, 3, 3).distinct().forEach(System.out::println);

        // Empty. Make a new stream empty - Intermediate
        System.out.println("========= Stream.empty() ========");
        System.out.println(Stream.empty().count());

        // filter - Intermediate
        System.out.println("========= Stream.filter() ========");
        Stream.of(2, 4, 6).filter(i -> i > 2).forEach(System.out::println);

        // findAny(). Observation: Parallel return random number. Sequential returns first element - Terminal
        System.out.println("========= Stream.findAny() ========");
        System.out.println(Stream.of(2, 4, 6).parallel().findAny().get());

        // findFirst(). - Terminal
        System.out.println("========= Stream.findFirst() ========");
        System.out.println(Stream.of(2, 4, 6).findFirst().get());

        // forEach() - Terminal
        System.out.println("========= Stream.forEach() ========");
        Stream.of(2, 4, 6).forEach(System.out::println);


        // forEachOrdered() - process in the same order they were added - Terminal
        System.out.println("========= Stream.forEachOrdered() ========");
        Stream.of(6, 2, 4).forEachOrdered(System.out::println);

        // generate() - Create a unlimited size stream.
        // If limit() is not used then this stream will never end - Intermediate
        System.out.println("========= Stream.generate() ========");
        Stream.generate(() -> (int) (Math.random() * 10)).limit(2).forEach(System.out::println);

        // iterate() - Create a unlimited size stream. Sequential stream
        // If limit() is not used then this stream will never end - Intermediate
        System.out.println("========= Stream.iterate() ========");
        Stream.iterate(0, i -> i + 1).limit(5).forEach(System.out::println);

        // limit() - Limits Stream - Intermediate
        // Do not give error if limit value is higher than number of elements available in the stream
        System.out.println("========= Stream.limit() ========");
        Stream.of(2, 4, 6).limit(2).forEach(System.out::println);

        // map() - Perform special action of each element before terminal - Intermediate
        System.out.println("========= Stream.map() ========");
        Stream.of(2, 4, 6).map(i -> i * 2).forEach(System.out::println);

        // mapToInt(), mapToDouble(), mapToLong() - converts Stream to IntStream, LongStream, DoubleStream - Intermediate
        System.out.println("========= Stream.mapToInt() ========");
        System.out.println(Stream.of(2, 4, 6).mapToInt(i -> i).sum());

        // max(), min() - Terminal
        System.out.println("========= Stream.max() ========");
        System.out.println(Stream.of(2, 4, 6).max((a, b) -> {if (a == b) return 0; else if(a > b) return 1; else return -1;} ).get());

        // noneMatch() - Terminal
        System.out.println("========= Stream.noneMatch() ========");
        System.out.println(Stream.of(2, 4, 6).noneMatch(a -> a == 1));

        // peek() - Its just like forEach that excepts Consumer. - Intermediate
        // But its a Intermediate and forEach is Terminal
        System.out.println("========= Stream.peek() ========");
        Stream.of(2, 4, 6).peek(System.out::println).forEach(System.out::println);

        // skip() - Intermediate
        System.out.println("========= Stream.skip() ========");
        Stream.of(2, 4, 6).skip(1).forEach(System.out::println);

        // sorted() - Intermediate
        System.out.println("========= Stream.sorted() ========");
        Stream.of(6, 2, 4).sorted().forEach(System.out::println);

        // toArray() - Terminal
        System.out.println("========= Stream.toArray() ========");
        for (Object num : Stream.of(2, 4, 6).toArray()) {
            System.out.println(num);
        }

        // TODO: Do these examples
        // collect()
        // flatMap()
        // reduce()
        // IntStream, DoubleStream, LongStream
        // convert stream to array, iterator, list and back to stream
    }
}
