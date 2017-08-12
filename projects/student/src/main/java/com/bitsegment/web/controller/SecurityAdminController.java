package com.bitsegment.web.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.validation.Valid;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.bitsegment.domain.Authority;
import com.bitsegment.domain.SecureUser;
import com.bitsegment.domain.SecureUserRole;
import com.bitsegment.services.SecurityAdminService;
import com.bitsegment.util.ServiceUtils;
import com.bitsegment.web.command.SecureUserCommand;

@Controller
@RequestMapping("/admin")
public class SecurityAdminController {

	@Inject
	@Named("securityAdminService")
	private SecurityAdminService securityAdminService;

	@Transactional
	@RequestMapping("")
	public String adminDefault(@RequestParam(value = "profileof", required = false) String profileof,
			@RequestParam(value = "admincode", required = false) String adminCode, Map<String, Object> model) {
		String viewName = "login";
		String currenctLoggedInUser = ServiceUtils.getCurrenctLoggedInUser();
		boolean adminCodeVerified = ServiceUtils.verifyAdminCode(adminCode);
		if ((StringUtils.isBlank(currenctLoggedInUser) && adminCodeVerified)
				|| StringUtils.isNotBlank(currenctLoggedInUser)) {
			viewName = "admin";
		}
		SecureUserCommand command = new SecureUserCommand();
		command.setAdminCodeVerified(adminCodeVerified);
		model.put("secureUserCommand", command);
		SecureUser secureUser = securityAdminService.getSecureUserByUserName(profileof);
		mapSecureUserToCommand(secureUser, command);
		loadAllAdminList(model);
		return viewName;
	}

	@Transactional
	@RequestMapping(value = "/save", method = RequestMethod.GET)
	public String saveAdmin(Map<String, Object> model,
			@ModelAttribute("secureUserCommand") @Valid SecureUserCommand command, BindingResult results) {
		String redirectView = "admin";
		if (StringUtils.isBlank(command.getUserId()) && StringUtils.isNotBlank(command.getUserName())) {
			SecureUser secureUser = securityAdminService.getSecureUserByUserName(command.getUserName());
			if (secureUser != null) {
				results.rejectValue("userName", null, "User name already exists.");
				// results.addError(new ObjectError("secureUserCommand", ));
			}
		}

		if (results.hasErrors()) {
			model.put("viewMessage", "Admin user not saved");
		} else {
			SecureUser secureUser = securityAdminService.getSecureUserById(ServiceUtils.toLong(command.getUserId()));
			if (secureUser == null) {
				secureUser = new SecureUser();
			}

			mapCommandToSecureUser(command, secureUser);
			securityAdminService.save(secureUser);
			model.put("viewMessage", "Admin user saved");
			redirectView = "admin-confirmation";
		}
		loadAllAdminList(model);

		return redirectView;
	}

	@Transactional
	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String deleteAdmin(Map<String, Object> model, @RequestParam(value = "id", required = true) Long id) {
		securityAdminService.removeSecureUserById(id);
		SecureUserCommand command = new SecureUserCommand();
		model.put("secureUserCommand", command);
		loadAllAdminList(model);
		return "admin";
	}

	public void loadAllAdminList(Map<String, Object> model) {
		if (ServiceUtils.userHaveRole(Authority.ROLE_ADMIN)) {
			List<SecureUser> allSecureUsers = securityAdminService.getAllSecureUsers();
			model.put("allSecureUsers", allSecureUsers);
		}
	}

	private void mapCommandToSecureUser(SecureUserCommand command, SecureUser user) {
		if (command == null) {
			return;
		}
		user.setId(ServiceUtils.toLong(command.getUserId()));
		user.setEnabled(1);
		user.setUserName(command.getUserName());
		user.setUserPassword(command.getUserPassword());
		mapUserRoles(command, user);
	}

	private void mapUserRoles(SecureUserCommand command, SecureUser user) {
		if (!ServiceUtils.userHaveRole(Authority.ROLE_ADMIN) && !command.isAdminCodeVerified()) {
			return;
		}
		List<SecureUserRole> rolesToRemove = new ArrayList<SecureUserRole>();
		List<String> rolesNameAlreadyExists = new ArrayList<String>();

		if (command.getSecurityRoles() == null) {
			securityAdminService.removeAllAdminRoles(user);
		}

		if (user.getSecureUserRoles() != null) {
			for (SecureUserRole secureUserRole : user.getSecureUserRoles()) {
				String roleName = secureUserRole.getAuthority().toString();
				if (command.getSecurityRoles() != null && !command.getSecurityRoles().contains(roleName)) {
					rolesToRemove.add(secureUserRole);
				} else {
					rolesNameAlreadyExists.add(roleName);
				}
			}
			user.getSecureUserRoles().removeAll(rolesToRemove);
			securityAdminService.removeRoles(rolesToRemove);
		}
		if (command.getSecurityRoles() != null) {
			for (String roleString : command.getSecurityRoles()) {
				if (rolesNameAlreadyExists.contains(roleString)) {
					continue;
				}
				Authority authority = Authority.valueOf(roleString);
				if (authority != null) {
					user.addAuthority(authority);
				}
			}
		}
	}

	private void mapSecureUserToCommand(SecureUser user, SecureUserCommand command) {
		if (user == null) {
			return;
		}
		if (user.getId() != null) {
			command.setUserId("" + user.getId());
		}
		command.setUserName(user.getUserName());
		command.setUserPassword(user.getUserPassword());
		command.setSecurityRoles(user.allRoles());
	}

	// @PostFilter("hasPermission(filterObject, 'READ')")
	// public List<Post> getAll();
	// @PreAuthorize("hasAuthority('ROLE_ADMIN')")
	// @PreAuthorize("hasAuthority('ROLE_USER') and !hasAuthority('ROLE_ADMIN')")
	// SecurityContextHolder.getContext().getAuthentication().getAuthorities()
}
