package com.ihg.zoo.domain.animal;

import com.ihg.zoo.domain.NutritionType;

public class Tigers extends Animal {

	private static int total;

	public Tigers() {
		total++;
	}

	public int totalCount() {
		return Tigers.total;
	}

	@Override
	public NutritionType getAnimalNutritionType() {
		return NutritionType.CARNIVOROUS;
	}

}
