package com.sc.spring3.spel;

import java.util.Iterator;
import java.util.List;

import com.sc.spring3.utils.BeanUtils;

public class CityChooserMain {
	private City cityA;
	private City cityB;
	private City cityC;
	private List<City> bigCities;
	
	public static void main(String[] args) {
		CityChooserMain cityChooserMain = (CityChooserMain) BeanUtils.getBean("cityChooserMain");
		System.out.println("City A=" + cityChooserMain.getCityA().getName());
		System.out.println("City B=" + cityChooserMain.getCityB().getName());
		System.out.println("City C=" + cityChooserMain.getCityC().getName());
		System.out.println("==========BigCities==========");
		for (City city : cityChooserMain.getBigCities()) {
			System.out.println(city);
		}
		
	}

	public City getCityA() {
		return cityA;
	}

	public void setCityA(City cityA) {
		this.cityA = cityA;
	}

	public City getCityB() {
		return cityB;
	}

	public void setCityB(City cityB) {
		this.cityB = cityB;
	}

	public City getCityC() {
		return cityC;
	}

	public void setCityC(City cityC) {
		this.cityC = cityC;
	}

	public List<City> getBigCities() {
		return bigCities;
	}

	public void setBigCities(List<City> bigCities) {
		this.bigCities = bigCities;
	}
	
	
}
