package com.bitsegment.web.controller;

import java.util.Calendar;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.bitsegment.services.PaidType;
import com.bitsegment.services.SearchQueryType;
import com.bitsegment.services.SortField;
import com.bitsegment.services.SortOrder;

@Controller("searchController")
@RequestMapping("/search")
public class SearchController {

	@Inject
	@Named("searchControllerHelper")
	private SearchControllerHelper searchControllerHelper;

	@RequestMapping(value = "/{paidType}/{year}/{month}/{searchQuery}/{pageNumber}/{ajaxFlag}/{sortField}/{sortOrder}", method = RequestMethod.GET)
	public String searchByPaidTypeDateQueryPageAjaxOrder(@PathVariable("paidType") String paidType,
			@PathVariable("year") String yearString, @PathVariable("month") String monthString,
			@PathVariable("searchQuery") String searchQuery, @PathVariable("pageNumber") int pageNumber,
			@PathVariable("ajaxFlag") boolean ajaxFlag, @PathVariable("sortField") String sortField,
			@PathVariable("sortOrder") String sortOrder, Map<String, Object> model) {
		return searchControllerHelper.searchByPaidTypeDateQueryPageAjaxOrder(paidType, yearString, monthString,
				searchQuery, pageNumber, ajaxFlag, sortField, sortOrder, model);
	}

	@RequestMapping(value = "", method = RequestMethod.GET)
	public String search(Map<String, Object> model) {

		Calendar calendar = Calendar.getInstance();
		return this.searchByPaidTypeDateQueryPageAjaxOrder(PaidType.all.toString(), "" + calendar.get(Calendar.YEAR),
				"" + calendar.get(Calendar.MONTH), SearchQueryType.searchany.toString(), 0, false,
				SortField.none.toString(), SortOrder.asc.toString(), model);

	}

	@RequestMapping(value = "/{paidType}", method = RequestMethod.GET)
	public String searchByPaidType(@PathVariable("paidType") String paidType, Map<String, Object> model) {

		Calendar calendar = Calendar.getInstance();
		return this.searchByPaidTypeDateQueryPageAjaxOrder(paidType, "" + calendar.get(Calendar.YEAR),
				"" + calendar.get(Calendar.MONTH), SearchQueryType.searchany.toString(), 0, false,
				SortField.none.toString(), SortOrder.asc.toString(), model);
	}

	@RequestMapping(value = "/{paidType}/{year}", method = RequestMethod.GET)
	public String searchByPaidTypeYear(@PathVariable("paidType") String paidType, @PathVariable("year") String year,
			Map<String, Object> model) {

		Calendar calendar = Calendar.getInstance();
		return this.searchByPaidTypeDateQueryPageAjaxOrder(paidType, year, "" + calendar.get(Calendar.MONTH),
				SearchQueryType.searchany.toString(), 0, false, SortField.none.toString(),
				SortOrder.asc.toString(), model);
	}

	@RequestMapping(value = "/{paidType}/{year}/{month}", method = RequestMethod.GET)
	public String searchByPaidTypeDate(@PathVariable("paidType") String paidType, @PathVariable("year") String year,
			@PathVariable("month") String month, Map<String, Object> model) {

		return this.searchByPaidTypeDateQueryPageAjaxOrder(paidType, year, month, SearchQueryType.searchany.toString(),
				0, false, SortField.none.toString(), SortOrder.asc.toString(), model);
	}

	@RequestMapping(value = "/{paidType}/{year}/{month}/{searchQuery}", method = RequestMethod.GET)
	public String searchByPaidTypeDateQuery(@PathVariable("paidType") String paidType,
			@PathVariable("year") String year, @PathVariable("month") String month,
			@PathVariable("searchQuery") String searchQuery, Map<String, Object> model) {

		return this.searchByPaidTypeDateQueryPageAjaxOrder(paidType, year, month, searchQuery, 0, false,
				SortField.none.toString(), SortOrder.asc.toString(), model);
	}

	@RequestMapping(value = "/{paidType}/{year}/{month}/{searchQuery}/{pageNumber}", method = RequestMethod.GET)
	public String searchByPaidTypeDateQueryPage(@PathVariable("paidType") String paidType,
			@PathVariable("year") String year, @PathVariable("month") String month,
			@PathVariable("searchQuery") String searchQuery, @PathVariable("pageNumber") int pageNumber,
			Map<String, Object> model) {

		return this.searchByPaidTypeDateQueryPageAjaxOrder(paidType, year, month, searchQuery, pageNumber, false,
				SortField.none.toString(), SortOrder.asc.toString(), model);
	}

	@RequestMapping(value = "/{paidType}/{year}/{month}/{searchQuery}/{pageNumber}/{ajaxFlag}", method = RequestMethod.GET)
	public String searchByPaidTypeDateQueryPageAjax(@PathVariable("paidType") String paidType,
			@PathVariable("year") String year, @PathVariable("month") String month,
			@PathVariable("searchQuery") String searchQuery, @PathVariable("pageNumber") int pageNumber,
			@PathVariable("ajaxFlag") boolean ajaxFlag, Map<String, Object> model) {

		return this.searchByPaidTypeDateQueryPageAjaxOrder(paidType, year, month, searchQuery, pageNumber, ajaxFlag,
				SortField.none.toString(), SortOrder.asc.toString(), model);
	}
}
