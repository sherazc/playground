package com.sc.stream.eg09_collect_grouping_by;

import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class App {

    public static void main(String[] args) {

        /*
        collect() could also be used to perform groupingBy() operations.
         */
        Stream<Item> itemStream = Stream.of(
                new Item("USB", "computer", 10d),
                new Item("Engine", "car", 20d),
                new Item("HD", "computer", 30d),
                new Item("RAM", "computer", 40d),
                new Item("Wheel", "car", 50d));

        Map<String, Double> averagePrices = itemStream.collect(
                Collectors.groupingBy(
                        item -> item.type,
                        Collectors.averagingDouble((item) -> item.price)
                ));

        averagePrices.forEach((itemType, averagePrice) -> System.out.println(itemType + " average price " + averagePrice));
    }

    static class Item {
        public String name;
        public String type;
        public double price;

        public Item(String name, String type, double price) {
            this.name = name;
            this.type = type;
            this.price = price;
        }
    }
}
