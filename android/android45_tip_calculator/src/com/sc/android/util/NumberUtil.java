package com.sc.android.util;

public class NumberUtil {

	public static int stringToInt(Object obj) {
		if (obj == null) {
			return 0;
		}
		int result = 0;
		try {
			String numString = obj.toString().trim();
			result = Integer.parseInt(numString);
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}

	public static double stringToDouble(Object obj) {
		if (obj == null) {
			return 0;
		}
		double result = 0;
		try {
			String numString = obj.toString().trim();
			result = Double.parseDouble(numString);
		} catch (Exception e) {
			result = 0;
		}
		return result;
	}
}
