package com.bitsegment.web.controller;

import java.util.Collections;
import java.util.Map;

import javax.inject.Inject;
import javax.inject.Named;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.bitsegment.domain.StudentData;
import com.bitsegment.services.StudentDataService;
import com.bitsegment.services.StudentFeePaidComparator;
import com.bitsegment.util.DateUtils;
import com.bitsegment.util.ServiceUtils;
import com.bitsegment.web.command.StudentCommand;

@Controller
@RequestMapping("/register")
public class RegisterControler {

	private static final String VIEW_MESSAGE = "viewMessage";

	@Inject
	@Named("studentDataService")
	private StudentDataService studentDataService;

	@RequestMapping(value = "", method = RequestMethod.GET)
	public String show(Map<String, Object> model, @RequestParam(required = false, value = "id") String studentIdParam) {
		Long studentId = ServiceUtils.toLong(studentIdParam);
		StudentData studentData = studentDataService.getStudentById(studentId);

		StudentCommand studentCommand = new StudentCommand();
		if (studentData != null) {
			Collections.sort(studentData.getStudentFeePaids(), new StudentFeePaidComparator());
			mapStudentDataInStudentCommand(studentData, studentCommand);
		}
		studentCommand.setId(studentId);
		model.put("studentCommand", studentCommand);
		model.put("studentData", studentData);
		return "register";
	}

	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@Transactional
	public String save(Map<String, Object> model,
			@ModelAttribute("studentCommand") @Valid StudentCommand studentCommand, BindingResult results) {
		String view = null;
		boolean create = true;
		StudentData studentData = studentDataService.getStudentById(studentCommand.getId());
		if (studentData == null) {
			studentData = new StudentData();
			create = true;
		} else {
			Collections.sort(studentData.getStudentFeePaids(), new StudentFeePaidComparator());
			create = false;
		}

		model.put("studentData", studentData);

		if (results.hasErrors()) {
			view = "register";
		} else {
			mapStudentCommandInStudentData(studentCommand, studentData);
			studentDataService.save(studentData);
			view = "register-confirmation";
			String viewMessage = studentData.getFirstName() + " " + studentData.getLastName();
			if (create) {
				viewMessage += " is registered.";

			} else {
				viewMessage += "'s registration is updated.";
			}
			model.put(VIEW_MESSAGE, viewMessage);
		}
		return view;
	}

	@RequestMapping(value = "/delete", method = RequestMethod.GET)
	@Transactional
	public String delete(Map<String, Object> model, @RequestParam(required = true, value = "id") String studentIdParam) {
		Long studentId = ServiceUtils.toLong(studentIdParam);
		studentDataService.deleteStudentById(studentId);
		model.put(VIEW_MESSAGE, "Student registration is delete from the system.");
		return "register-confirmation";
	}

	private void mapStudentCommandInStudentData(StudentCommand studentCommand, StudentData studentData) {
		if (studentData == null || studentCommand == null) {
			return;
		}
		studentData.setFirstName(studentCommand.getFirstName());
		studentData.setLastName(studentCommand.getLastName());
		studentData.setGuardianFirstName(studentCommand.getGuardianFirstName());
		studentData.setGuardianLastName(studentCommand.getGuardianLastName());
		studentData.setFee(ServiceUtils.toInt(studentCommand.getFee()));
		studentData.setPhoneNumber(studentCommand.getPhoneNumber());
		studentData.setRegistrationDate(DateUtils.stringMonthYearToDate(studentCommand.getRegistrationDate()));
	}

	private void mapStudentDataInStudentCommand(StudentData studentData, StudentCommand studentCommand) {
		if (studentCommand == null || studentData == null) {
			return;
		}
		studentCommand.setFirstName(studentData.getFirstName());
		studentCommand.setLastName(studentData.getLastName());
		studentCommand.setGuardianFirstName(studentData.getGuardianFirstName());
		studentCommand.setGuardianLastName(studentData.getGuardianLastName());
		if (studentData.getFee() != null) {
			studentCommand.setFee(studentData.getFee().toString());
		}
		studentCommand.setPhoneNumber(studentData.getPhoneNumber());
		studentCommand.setRegistrationDate(DateUtils.dateToMonthYearString(studentData.getRegistrationDate()));
	}
}
