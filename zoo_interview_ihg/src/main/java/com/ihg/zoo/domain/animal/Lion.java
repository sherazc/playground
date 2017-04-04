package com.ihg.zoo.domain.animal;

import com.ihg.zoo.domain.NutritionType;

public class Lion extends Animal {

	private static int total;

	public Lion() {
		total++;
	}

	public int totalCount() {
		return Lion.total;
	}

	public int speak() {
		System.out.println("Roar");
		return super.speak();
	}
	
	@Override
	public NutritionType getAnimalNutritionType() {
		return NutritionType.CARNIVOROUS;
	}

}
