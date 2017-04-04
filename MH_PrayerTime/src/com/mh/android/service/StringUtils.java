package com.mh.android.service;

public class StringUtils {

	public static boolean isNotBlank(String string) {
		return string != null && string.trim().length() > 0;
	}

	public static boolean isBlank(String string) {
		return string == null || string.trim().length() < 1;
	}

	public static int parseInt(String string) {
		if (StringUtils.isBlank(string)) {
			return 0;
		}
		int result = 0;
		try {
			result = Integer.parseInt(string.trim());
		} catch (NumberFormatException e) {
		}
		return result;
	}
}
