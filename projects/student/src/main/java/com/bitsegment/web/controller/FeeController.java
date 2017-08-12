package com.bitsegment.web.controller;

import java.util.Enumeration;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bitsegment.services.FeePaidService;

@Controller("feeController")
@RequestMapping("/fee")
public class FeeController {

	private static final String INPUT_FIELD_DELIM = "_";

	private static final String INPUT_FIELD_PREFIX = "feeinput_";

	@Inject
	@Named("searchControllerHelper")
	private SearchControllerHelper searchControllerHelper;

	@Inject
	@Named("feePaidService")
	private FeePaidService feePaidService;

	@RequestMapping(value = "/save", method = RequestMethod.GET)
	public String depositFeeRedirectHome() {
		return "redirect:/";
	}

	@SuppressWarnings("unchecked")
	@Transactional
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public String depositFee(HttpServletRequest request, HttpServletResponse response, Map<String, Object> model) {
		Enumeration<String> paramNamesEnum = request.getParameterNames();
		String selectedYearString = request.getParameter("selectedYear");
		String selectedMonthString = request.getParameter("selectedMonth");

		while (paramNamesEnum.hasMoreElements()) {
			String paramName = paramNamesEnum.nextElement();
			if (StringUtils.startsWith(paramName, FeeController.INPUT_FIELD_PREFIX)) {
				String[] paramNameKeys = paramName.split(FeeController.INPUT_FIELD_DELIM);
				String studentIdString = paramNameKeys[1];
				String feeIdString = getFeeIdString(paramNameKeys);
				String feeValueString = request.getParameter(paramName);
				feePaidService.saveFee(studentIdString, feeIdString, feeValueString, selectedYearString,
						selectedMonthString, model);
			}
		}
		return this.forwardSearchController(request, model);
	}

	private String getFeeIdString(String[] paramNameKeys) {
		String feeIdString = null;
		if (paramNameKeys.length > 2) {
			feeIdString = paramNameKeys[2];
		}
		return feeIdString;
	}

	private String forwardSearchController(HttpServletRequest request, Map<String, Object> model) {
		String selectedPaidType = request.getParameter("selectedPaidType");
		String selectedYear = request.getParameter("selectedYear");
		String selectedMonth = request.getParameter("selectedMonth");
		String searchQuery = request.getParameter("searchQuery");
		String sortField = request.getParameter("sortField");
		String sortOrder = request.getParameter("sortOrder");
		int pageNumber = NumberUtils.toInt(request.getParameter("pageNumber"));
		return searchControllerHelper.searchByPaidTypeDateQueryPageAjaxOrder(selectedPaidType, selectedYear,
				selectedMonth, searchQuery, pageNumber, false, sortField, sortOrder, model);
	}
}
