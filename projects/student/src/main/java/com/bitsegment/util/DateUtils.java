package com.bitsegment.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {

	public static final String MON_YEAR_DATE_PATTERN = "MMM, yyyy";
	public static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat(MON_YEAR_DATE_PATTERN);

	public static final Date stringMonthYearToDate(String dateString) {
		Date date = null;
		try {
			date = org.apache.commons.lang.time.DateUtils.parseDate(dateString, new String[] { MON_YEAR_DATE_PATTERN });
		} catch (Exception e) {
			date = new Date();
		}
		return date;
	}
	
	public static final String dateToMonthYearString(Date date) {
		String result = null;
		if (date == null) {
			date = new Date();
		}
		try {
			result = simpleDateFormat.format(date);
		} catch (Exception e) {
		}
		return result;
	}

	public static final Date getMonthStartDate(int month, int year) {
		Calendar calendar = DateUtils.getCalendar(1, month, year);
		calendar.add(Calendar.MILLISECOND, -1);
		return calendar.getTime();
	}

	public static final Date getMonthEndDate(int month, int year) {
		Calendar calendar = DateUtils.getCalendar(1, month, year);
		calendar.add(Calendar.MONTH, 1);
		calendar.add(Calendar.MILLISECOND, -1);
		return calendar.getTime();
	}

	// public static final Date getEndDay

	public static final Calendar getCalendar(int date, int month, int year) {
		Calendar cal = Calendar.getInstance(); // locale-specific
		// cal.setTime(dateObject);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);

		cal.set(Calendar.DATE, date);
		cal.set(Calendar.MONTH, month);
		cal.set(Calendar.YEAR, year);
		return cal;
	}

	public static final Date createDateByMonthYear(int month, int year) {
		return DateUtils.getCalendar(1, month, year).getTime();
	}
	
	public static final int getTodaysDate() {
		return Calendar.getInstance().get(Calendar.DATE); 
	}
	
	public static final int getTodaysMonth() {
		return Calendar.getInstance().get(Calendar.MONTH); 
	}
	
	public static final int getTodaysYear() {
		return Calendar.getInstance().get(Calendar.YEAR); 
	}
	
	public static final String monthYearToString(int month, int year) {
		return dateToMonthYearString(createDateByMonthYear(month, year));
	}
}
