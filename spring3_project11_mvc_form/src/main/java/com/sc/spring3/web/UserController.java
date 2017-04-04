package com.sc.spring3.web;

import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.apache.commons.lang.SerializationUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.DefaultSessionAttributeStore;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.context.request.WebRequest;

import com.sc.spring3.dao.UserContactDao;
import com.sc.spring3.entity.UserContact;

@Controller
@RequestMapping("user")
@SessionAttributes({ "currentUserContact", "testSessionValue" })
public class UserController {

	// http://docs.jboss.org/hibernate/validator/4.0.1/reference/en-US/html/index.html
	// http://static.springsource.org/spring/docs/3.0.0.RC3/reference/html/ch05s07.html
	// http://www.mkyong.com/spring-mvc/spring-3-mvc-and-jsr303-valid-example/
	// http://www.roseindia.net/tutorial/spring/spring3/web/spring-3-mvc-validation-example.html

	@Inject
	@Named("userContactDao")
	private UserContactDao userContactDao;

	@RequestMapping(value = "login")
	public String show(Map<String, Object> model) {
		LoginForm loginForm = new LoginForm();

		model.put("loginFormCommand", loginForm);

		return "loginForm";

	}

	@RequestMapping(method = RequestMethod.GET, value = "authenticate")
	public String login(Map<String, Object> model, @ModelAttribute("loginFormCommand") @Valid LoginForm loginForm,
			BindingResult results) {

		String resultPage = null;
		if (results.hasErrors()) {
			resultPage = "loginForm";
		} else {

			UserContact userContact = userContactDao
					.getByUserIdPassword(loginForm.getUserId(), loginForm.getPassword());
			if (userContact == null) {
				results.addError(new ObjectError("loginFormCommand", "User not found."));
				resultPage = "loginForm";
			} else {
				model.put("currentUserContact", userContact);
				resultPage = "redirect:/home";
			}
		}

		return resultPage;
	}

	@RequestMapping(value = "logout")
	public String logout(DefaultSessionAttributeStore status, WebRequest request, ModelMap model) {
		model.remove("currentUserContact");
		status.cleanupAttribute(request, "currentUserContact");
		return "redirect:/home";
	}

	@RequestMapping(method = RequestMethod.GET, value = "register")
	public String registerUser(Map<String, Object> model) {
		UserContact userContact = new UserContact();
		model.put("registerUserContact", userContact);
		return "register";
	}

	@RequestMapping(method = RequestMethod.GET, value = "edit/current-user")
	public String editCurrentUserContact(Map<String, Object> model) {
		UserContact userContact = (UserContact) model.get("currentUserContact");
		UserContact editUserContact = (UserContact) SerializationUtils.clone(userContact);
		model.put("editUserContact", editUserContact);
		return "editUserContact";
	}

	@RequestMapping(method = RequestMethod.POST, value = "edit/current-user-confirmation")
	public String editUserContactConfirmation(Map<String, Object> model,
			@ModelAttribute("editUserContact") @Valid UserContact editUserContact, BindingResult results) {
		String resultPage = "";
		if (results.hasErrors()) {
			resultPage = "editUserContact";
		} else {
			UserContact userContact = this.userContactDao.save(editUserContact);
			model.put("currentUserContact", userContact);
			resultPage = "editUserContactConfirmation";
		}
		return resultPage;
	}

	@RequestMapping(method = RequestMethod.POST, value = "registration-confirmation")
	public String registrationConfirmation(Map<String, Object> model,
			@ModelAttribute("registerUserContact") @Valid UserContact registerUserContact, BindingResult results) {
		String resultPage = "";
		if (results.hasErrors()) {
			resultPage = "register";
		} else {
			UserContact userContact = this.userContactDao.save(registerUserContact);
			if (userContact.getId() != null && userContact.getId() > 0) {
				resultPage = "registrationConfirmation";
			} else {
				resultPage = "register";
			}
		}
		return resultPage;
	}

	public UserContactDao getUserContactDao() {
		return userContactDao;
	}

	public void setUserContactDao(UserContactDao userContactDao) {
		this.userContactDao = userContactDao;
	}

}
