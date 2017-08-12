package com.sc.service.controller;

public class HealthPlanController {
	public String signup() {
		if (Math.random() < 0.5) {
			return "accepted";
		} else {
			return "rejected";
		}
	}
}
