package com.sc.async.eg10_forkJoinPool_RecursiveAction.eg11_forkJoinPool_RecursiveTask;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.ForkJoinTask;
import java.util.concurrent.Future;
import java.util.concurrent.RecursiveTask;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class App {
    public static void main(String[] args) throws Exception {
        List<Integer> numbers = IntStream.range(1, 10).boxed()
                .map(i -> i * 10).collect(Collectors.toList());

        ForkJoinPool forkJoinPool = ForkJoinPool.commonPool();
        ForkJoinTask<Integer> rootTask = new Task(numbers, 0, numbers.size());
        Future<Integer> future = forkJoinPool.submit(rootTask);

        System.out.println(numbers + "\nResult=" + future.get());
        forkJoinPool.shutdown();
    }
}

class Task extends RecursiveTask<Integer> {
    private List<Integer> numbers;
    private int indexFrom;
    private int indexTo;

    Task(List<Integer> numbers, int indexFrom, int indexTo) {
        this.numbers = numbers;
        this.indexFrom = indexFrom;
        this.indexTo = indexTo;
    }

    @Override
    protected Integer compute() {
        int result;
        if (indexTo - indexFrom < 3) {
            // process only if task is small enough
            result = IntStream
                    .range(indexFrom, indexTo)
                    .map(numbers::get)
                    .sum();
        } else {
            // Task needs to be broken down more
            int indexMiddle = (indexFrom + indexTo) / 2;
            ForkJoinTask<Integer> task1 = new Task(numbers, indexFrom, indexMiddle);
            ForkJoinTask<Integer> task2 = new Task(numbers, indexMiddle, indexTo);
            task1.fork();
            task2.fork();

            result = task1.join() + task2.join();
        }
        return result;
    }
}