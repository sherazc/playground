package com.mh.android.entity;

public class Time extends Tag {

	public static final int AM = 100;
	public static final int PM = 200;
	
	private int minute;
	private int hour;
	private int amPm;

	public Time(int hour, int minute, int amPm) {
		super();
		this.hour = hour;
		this.minute = minute;
		this.amPm = amPm;
	}

	public int getMinute() {
		return minute;
	}

	public void setMinute(int minute) {
		this.minute = minute;
	}

	public int getHour() {
		return hour;
	}

	public void setHour(int hour) {
		this.hour = hour;
	}

	public int getAmPm() {
		return amPm;
	}

	public void setAmPm(int amPm) {
		this.amPm = amPm;
	}
}
