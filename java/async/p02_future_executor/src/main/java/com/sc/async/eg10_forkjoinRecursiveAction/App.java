package com.sc.async.eg10_forkjoinRecursiveAction;

import java.util.List;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.Future;
import java.util.concurrent.RecursiveAction;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import com.sc.async.common.MyThreadUtils;

public class App {

    // This example multiply numbers in a list with a multiplier
    public static void main(String[] args) throws Exception {
        List<Integer> numbers = IntStream.range(1, 10).boxed().collect(Collectors.toList());

        // Create the root task. This task will be broken down into
        // smaller task before processing begins
        Task rootTask = new Task(numbers, 0, numbers.size(), 10);

        ForkJoinPool forkJoinPool = ForkJoinPool.commonPool();

        // Calling submit() instead of execute()
        // so that I can use Future to block main thread
        Future<Void> future = forkJoinPool.submit(rootTask);

        // Printing ForkJoinPool every 500 milliseconds.
        new Timer(true).schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println(forkJoinPool);
            }
        }, 0, 500);

        // blocking main thread
        future.get();

        // Print result
        System.out.println(numbers);

        forkJoinPool.shutdown();
    }
}


class Task extends RecursiveAction {

    private List<Integer> numbers;
    private int indexFrom;
    private int indexTo;
    private int multiplier;

    public Task(List<Integer> numbers, int indexFrom, int indexTo, int multiplier) {
        this.numbers = numbers;
        this.indexFrom = indexFrom;
        this.indexTo = indexTo;
        this.multiplier = multiplier;
    }

    @Override
    protected void compute() {
        if (indexTo - indexFrom < 3) {
            // This the actual process of fine gran task
            System.out.println("calling multiply");
            multiply(numbers, indexFrom, indexTo, multiplier);
        } else {
            System.out.println("Breaking task");
            // Break task
            int indexMiddle = (indexFrom + indexTo) / 2;
            // Creating recursive task
            Task task1 = new Task(numbers, indexFrom, indexMiddle + 1, multiplier);
            Task task2 = new Task(numbers, indexMiddle + 1, indexTo, multiplier);

            // Recursive call
            invokeAll(task1, task2);
        }
    }

    // Real task processing method
    private void multiply(List<Integer> numbers, int indexFrom, int indexTo, int multiplier) {
        IntStream.range(indexFrom, indexTo)
                .forEach(index -> {
                    System.out.println("Processing index " + index + ". " + Thread.currentThread().getName());
                    numbers.set(index, numbers.get(index) * multiplier);
                    MyThreadUtils.sleep(1000);
                });
    }
}