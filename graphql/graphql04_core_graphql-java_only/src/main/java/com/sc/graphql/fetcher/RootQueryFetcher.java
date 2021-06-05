package com.sc.graphql.fetcher;


import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import graphql.schema.DataFetcher;
import org.springframework.stereotype.Component;

@Component
public class RootQueryFetcher {
    public DataFetcher<String> getMyName() {
        return environment -> "Sheraz";
    }

    public DataFetcher<List<Integer>> getRandomNumbers() {
        return environment ->
                IntStream.range(0, environment.getArgument("count"))
                        .map(i -> (int) (Math.random() * 1000))
                        .boxed()
                        .collect(Collectors.toList());


    }
}
