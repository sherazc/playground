package com.ihg.zoo.domain.animal;

import com.ihg.zoo.domain.NutritionType;

public class Bears extends Animal {

	private static int total;
	
	private boolean trained;

	public Bears() {
		total++;
	}

	public int totalCount() {
		return Bears.total;
	}

	public void sleep() {
		super.setEnergyLevel(super.getEnergyLevel() + 10);
	}

	@Override
	public NutritionType getAnimalNutritionType() {
		return NutritionType.CARNIVOROUS;
	}

	public void dance() {
		if (this.isTrained()) {
			System.out.println("Look Ma! I'm Dancing");
		} else {
			System.out.println("Can't dancing");
		}
	}
	
	public boolean isTrained() {
		return trained;
	}

	public void setTrained(boolean trained) {
		this.trained = trained;
	}
}


