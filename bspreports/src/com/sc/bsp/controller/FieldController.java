package com.sc.bsp.controller;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.support.SessionStatus;

import com.sc.bsp.dao.ItemFieldDao;
import com.sc.bsp.domain.ItemField;

@RequestMapping({ "/field" })
@Controller
public class FieldController {

	@Inject
	@Named("itemFieldDao")
	private ItemFieldDao itemFieldDao;

	@RequestMapping({ "/show" })
	public String showFields(Map<String, Object> model) {
		List<ItemField> itemFields = itemFieldDao.getAll();
		model.put("itemFields", itemFields);
		return "field";
	}

	@RequestMapping(value = "/add", method = { RequestMethod.GET, RequestMethod.POST })
	public String addField(@ModelAttribute("fieldCommand") ItemField field, BindingResult result, SessionStatus status) {
		if (StringUtils.isBlank(field.getField())) {
			result.rejectValue("fieldName", "Field name can't be blank.");
		}

		if (result.hasErrors()) {
			return "field";
		} else {
			return "redirect:/show";
		}
	}
}