package com.ihg.zoo.domain.animal;

import com.ihg.zoo.domain.NutritionType;
import com.ihg.zoo.domain.food.Food;

public abstract class Animal {

	private int energyLevel;

	public int speak() {
		System.out.println("Grrr");
		return energyLevel;
	}

	public void eat(Food food) {
		if (food.getNutritionType() == this.getAnimalNutritionType()) {
			this.energyLevel += 3;
		}
	}

	public void sleep() {
		this.energyLevel += 8;
	}

	public void play() {
		if (this.energyLevel > 5) {
			System.out.println("YE-AH!");
			this.energyLevel -= 5;
		} else {
			System.out.println("I'm tired.");
		}
	}

	public abstract int totalCount();

	public abstract NutritionType getAnimalNutritionType();

	public int getEnergyLevel() {
		return energyLevel;
	}

	public void setEnergyLevel(int energyLevel) {
		this.energyLevel = energyLevel;
	}
}
