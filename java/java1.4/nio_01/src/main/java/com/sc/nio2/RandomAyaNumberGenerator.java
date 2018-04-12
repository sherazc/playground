package com.sc.nio2;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class RandomAyaNumberGenerator {

	public static void main(String[] args) {
		// Check if Collections.shuffle can help
		long startMillis = System.currentTimeMillis();
		long seed = 0;
		Random random = new Random();
		List<Integer> allInteger = new ArrayList<Integer>();
		int totalDuplicates = 0;
		for (int i = 0; i < 365* 3; i++) {
			random.setSeed(seed++);
			//int nextNumber = (int) (random.nextDouble() * 6237);
			int randomInt = random.nextInt();
			int nextNumber = (randomInt % 6237);
			if (nextNumber < 0) {
				nextNumber *= -1;
			}
			if (allInteger.contains(new Integer(nextNumber))) {
				totalDuplicates++;
				//System.out.println("Index=" + i + ", Random Int=" + randomInt + ", Seed=" + seed + ", NextNumber=" + nextNumber);
			}
			System.out.println("Index=" + i + ", Random Int=" + randomInt + ", Seed=" + seed + ", NextNumber=" + nextNumber);
			allInteger.add(new Integer(nextNumber));
			//if (nextNumber > 6210) {
				//System.out.println("Random Int=" + randomInt + ", Seed=" + seed + ", NextNumber=" + nextNumber);
			//}
			//System.out.println(nextNumber);
		}
		System.out.println("Total Duplicates=" + totalDuplicates);
		long endMillies = System.currentTimeMillis();
		System.out.println("Millis taken=" + (endMillies - startMillis));
	}
}
