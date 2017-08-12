package com.ihg.zoo.domain.food;

import com.ihg.zoo.domain.NutritionType;

public abstract class Food {

	private NutritionType nutritionType;

	public Food(NutritionType nutritionType) {
		this.nutritionType = nutritionType;
	}

	public NutritionType getNutritionType() {
		return nutritionType;
	}

	public void setNutritionType(NutritionType nutritionType) {
		this.nutritionType = nutritionType;
	}

}
