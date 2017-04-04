package com.bitsegment.util;

import java.util.Calendar;
import java.util.Collection;
import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.bitsegment.domain.Authority;
import com.bitsegment.services.SecurityAdminService;

public class ServiceUtils {

	public static final int convertYear(String string) {
		Calendar calendar = Calendar.getInstance();
		int currentYear = calendar.get(Calendar.YEAR);
		if (NumberUtils.isNumber(string)) {
			int result = NumberUtils.toInt(string);
			if (result > 2020 || result < 2000) {
				return currentYear;
			} else {
				return result;
			}
		} else {
			return currentYear;
		}
	}

	public static final int convertMonth(String string) {
		Calendar calendar = Calendar.getInstance();
		int currentMonth = calendar.get(Calendar.MONTH);
		if (NumberUtils.isNumber(string)) {
			int result = NumberUtils.toInt(string);
			if (result > 11 || result < 0) {
				return currentMonth;
			} else {
				return result;
			}
		} else {
			return currentMonth;
		}
	}

	public static final String formatPhoneNumber(String phoneNumber) {
		if (phoneNumber == null) {
			return null;
		}
		phoneNumber = phoneNumber.trim();
		String trimmedPhone = ServiceUtils.extractDigits(phoneNumber);
		return trimmedPhone.replaceFirst("(\\d{3})(\\d{3})(\\d+)", "($1) $2-$3");
	}

	public static final String extractDigits(String numberString) {
		if (numberString == null) {
			return null;
		}
		return numberString.replaceAll("[^\\d]", "");
	}

	public static final Long toLong(String str) {
		if (StringUtils.isBlank(str)) {
			return null;
		}
		return NumberUtils.toLong(StringUtils.trim(str));
	}

	public static final Integer toInt(String str) {
		if (StringUtils.isBlank(str)) {
			return null;
		}
		return NumberUtils.toInt(StringUtils.trim(str));
	}

	public static final String getSecurityCode() {
		return SecurityAdminService.CODE_DATE_FORMAT.format(new Date());
	}

	public static final boolean userHaveRole(Authority authority) {
		if (authority == null) {
			return false;
		}
		boolean result = false;
		SecurityContext securityContext = SecurityContextHolder.getContext();
		if (securityContext != null) {
			Collection<? extends GrantedAuthority> authorities = securityContext.getAuthentication().getAuthorities();
			if (authorities != null) {
				for (GrantedAuthority grantedAuthority : authorities) {
					if (authority.toString().equalsIgnoreCase(grantedAuthority.getAuthority())) {
						result = true;
						break;
					}
				}
			}
		}
		return result;
	}

	public static final boolean userHaveRole(String authority) {
		return userHaveRole(Authority.valueOf(authority));
	}

	public static final String getCurrenctLoggedInUser() {
		String currenctLoggedInUser = null;
		SecurityContext securityContext = SecurityContextHolder.getContext();
		if (securityContext != null) {
			Authentication authentication = securityContext.getAuthentication();
			if (authentication != null && authentication.isAuthenticated()) {
				String authenticationName = authentication.getName();
				currenctLoggedInUser = "anonymousUser".equalsIgnoreCase(authenticationName) ? null : authenticationName;
			}
		}
		return currenctLoggedInUser;
	}

	public static boolean verifyAdminCode(String adminCode) {
		return ServiceUtils.getSecurityCode().equals(adminCode);
	}
}
