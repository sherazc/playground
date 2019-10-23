package com.sc.equifax;

import java.util.Arrays;
import java.util.Map;
import java.util.TreeMap;

public class App {
    public static void main(String[] args) {
        int[] nums = new int[] {1, 5, 8, 2, 7, 8, 1, 9, 8, 2};
        int frequentNum = App.mostFrequentNumber(nums);

        System.out.println("Most Frequent Num: " + frequentNum);
    }

    public static int mostFrequentNumber(int[] nums) {
        if (nums == null || nums.length < 1) {
            return -1;
        }
        Map<Integer, Integer> allNumsCounts = new TreeMap<>();


        // count occurrence
        Arrays.stream(nums).forEach(num -> {
            if (!allNumsCounts.containsKey(num)) {
                allNumsCounts.put(num, 1);
            } else {
                allNumsCounts.put(num, allNumsCounts.get(num) + 1);
            }
        });


        int mostFrequentCount = -1;
        int mostFrequentNum = -1;


        for (int num: allNumsCounts.keySet()) {
            int count = allNumsCounts.get(num);
            if (count > mostFrequentCount) {
                mostFrequentCount = count;
                mostFrequentNum = num;
            }
        }

        return mostFrequentNum;
    }
}
