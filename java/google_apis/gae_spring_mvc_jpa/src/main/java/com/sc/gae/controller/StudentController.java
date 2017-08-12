package com.sc.gae.controller;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.inject.Inject;
import javax.inject.Named;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sc.gae.dao.StudentDao;
import com.sc.gae.dao.utils.EMF;
import com.sc.gae.domain.Student;

@Controller
@RequestMapping({ "/student" })
public class StudentController {

	private static final Logger LOG = Logger.getLogger(EMF.class.getName());

	@Inject
	@Named("studentDao")
	private StudentDao studentDao;

	@RequestMapping({ "" })
	public String main(Map<String, Object> model) {
		model.put("studentCommand", new Student());
		return "student";
	}

	@RequestMapping({ "/addstudent" })
	public String addStudent(Map<String, Object> model,
			@ModelAttribute("studentCommand") @Valid Student studentCommand, BindingResult results) {
		LOG.fine("Adding Student " + studentCommand);
		if (!results.hasErrors()) {
			studentDao.save(studentCommand);
		}
		return "student";
	}

	@RequestMapping("/delete")
	public String deleteStudent(Map<String, Object> model, @RequestParam("studentId") Long studentId) {
		model.put("studentCommand", new Student());
		LOG.fine("Deleting Student " + studentId);
		if (studentId != null) {
			studentDao.removeById(studentId);
		}
		return "redirect:/student";
	}

	@ModelAttribute("allStudents")
	public List<Student> populateAllStudents() {
		return studentDao.getAll();
	}
}
