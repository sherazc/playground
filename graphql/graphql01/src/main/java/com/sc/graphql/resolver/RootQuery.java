package com.sc.graphql.resolver;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RootQuery implements GraphQLQueryResolver {

    public String getMyName() {
        return "Sheraz";
    }

    public List<Integer> getRandomNumbers(Integer count) {
        return IntStream.range(0, count)
                .map(i -> (int) (Math.random() * 1000))
                .boxed()
                .collect(Collectors.toList());
    }
}
