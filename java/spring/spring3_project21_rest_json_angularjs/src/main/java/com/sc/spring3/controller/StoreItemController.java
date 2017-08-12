package com.sc.spring3.controller;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sc.spring3.dao.StoreItemDao;
import com.sc.spring3.domain.StoreItem;

@Controller
@RequestMapping("/storeitem")
public class StoreItemController {

	@Inject
	@Named("storeItemDao")
	private StoreItemDao storeItemDao;

	@RequestMapping("/all")
	public @ResponseBody
	List<StoreItem> getAllStoreItem() {
		return storeItemDao.getAll();
	}

	@RequestMapping(value = "/save", method = { RequestMethod.GET, RequestMethod.POST })
	@Transactional
	public @ResponseBody
	StoreItem save(@RequestBody StoreItem storeItem) {
		StoreItem savedStoreItem = null;
		if (storeItem != null) {
			savedStoreItem = storeItemDao.save(storeItem);
		}
		return savedStoreItem;
	}

	@RequestMapping(value = "/remove/{storeItemId}", method = { RequestMethod.GET, RequestMethod.POST })
	@Transactional
	public @ResponseBody
	boolean remove(@PathVariable("storeItemId") Long storeItemId) {
		boolean result = false;
		if (storeItemId != null) {
			storeItemDao.removeById(storeItemId);
			result = true;
		}
		return result;
	}
}
