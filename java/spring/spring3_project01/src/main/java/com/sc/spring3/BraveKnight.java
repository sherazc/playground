package com.sc.spring3;

public class BraveKnight implements Knight {

	private Quest quest;
	
	private String weapon;

	public BraveKnight(Quest quest) {
		this.quest = quest;
	}

	public void embarkOnQuest() {
		System.out.println("BraveKnight.embarkOnQuest()");
		System.out.println("Weapon: " + weapon);
		this.quest.embark();
	}

	public String getWeapon() {
		return weapon;
	}

	public void setWeapon(String weapon) {
		this.weapon = weapon;
	}
}
