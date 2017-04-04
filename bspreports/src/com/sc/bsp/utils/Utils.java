package com.sc.bsp.utils;

import javax.servlet.http.HttpServletRequest;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;

public class Utils {
	private Utils() {

	}

	public static long toLong(String number) {
		long num = 0;
		try {
			num = Long.parseLong(number);
		} catch (Exception e) {
		}
		return num;

	}

	public static boolean validKey(String keyStr) {
		if (keyStr == null) {
			return false;
		}
		boolean result = false;
		try {
			Key key = KeyFactory.stringToKey(keyStr);
			result = key != null;
		} catch (Exception e) {
		}
		return result;
	}

	public static String getParameter(HttpServletRequest request, String parameterName) {
		String parameterValue = request.getParameter(parameterName);
		request.setAttribute(parameterName, parameterValue);
		return parameterValue;
	}
	
	public static boolean isNotBlank(String string) {
		return string != null && string.trim().length() > 0;
	}
	
	public static boolean isBlank(String string) {
		return string == null || string.trim().length() < 1;
	}
	
	public static String trim(String string) {
		if (Utils.isBlank(string)) {
			return "";
		} else {
			return string.trim();
		}
	}
}
