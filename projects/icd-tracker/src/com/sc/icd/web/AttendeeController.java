package com.sc.icd.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.sc.icd.dao.ActivityDao;
import com.sc.icd.dao.ActivityDaoImpl;
import com.sc.icd.dao.AttendeeDao;
import com.sc.icd.dao.AttendeeDaoImpl;
import com.sc.icd.domain.Activity;
import com.sc.icd.domain.Attendee;
import com.sc.icd.utils.Utils;

public class AttendeeController extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private AttendeeDao attendeeDao;
	private ActivityDao activityDao;
	private List<String> result;
	private Activity currentActivity;

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		this.attendeeDao = new AttendeeDaoImpl();
		this.activityDao = new ActivityDaoImpl();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String action = request.getParameter(WebConstants.PARAM_ACTION);

		boolean validActivityRequest = validateActivityRequest(request);

		if (validActivityRequest && WebConstants.PARAM_VALUE_SHOW_ATTENDEE.equals(action)) {
			showAttendees(request, response);
		} else if (validActivityRequest && WebConstants.PARAM_VALUE_ADD_ATTENDEE.equals(action)) {
			addAttendees(request, response);
		} else if (validActivityRequest && WebConstants.PARAM_VALUE_CREATE_ATTENDEE.equals(action)) {
			createAttendees(request, response);
		} else if (validActivityRequest && WebConstants.PARAM_VALUE_DELETE_ATTENDEE.equals(action)) {
			deleteAttendees(request, response);
		} else {
			request.getRequestDispatcher("/activities").forward(request, response);
		}
	}

	private void deleteAttendees(HttpServletRequest request, HttpServletResponse response) throws ServletException,
	IOException {
		String attendeeIdStr = request.getParameter(WebConstants.PARAM_ATTENDEE_ID);
		if (Utils.validKey(attendeeIdStr)) {
			attendeeDao.removeById(KeyFactory.stringToKey(attendeeIdStr));
			result.add("Attendee deleted");
		} else {
			result.add("Unable to delete attendee");
		}
		this.showAttendees(request, response);
	}

	private void createAttendees(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {

		String fname = Utils.getParameter(request, WebConstants.PARAM_ATTENDEE_FNAME);
		String lname = Utils.getParameter(request, WebConstants.PARAM_ATTENDEE_LNAME);
		String email = Utils.getParameter(request, WebConstants.PARAM_ATTENDEE_EMAIL);
		String phone = Utils.getParameter(request, WebConstants.PARAM_ATTENDEE_PHONE);
		String profession = Utils.getParameter(request, WebConstants.PARAM_ATTENDEE_PROFESSION);
		String street = Utils.getParameter(request, WebConstants.PARAM_ATTENDEE_STREET);
		String city = Utils.getParameter(request, WebConstants.PARAM_ATTENDEE_CITY);
		String state = Utils.getParameter(request, WebConstants.PARAM_ATTENDEE_STATE);
		String zip = Utils.getParameter(request, WebConstants.PARAM_ATTENDEE_ZIP);
		String comments = Utils.getParameter(request, WebConstants.PARAM_ATTENDEE_COMMENTS);
		if (Utils.isBlank(fname)) {
			result.add("First name is blank");
		}
		if (Utils.isBlank(lname)) {
			result.add("Last name is blank");
		}
		if (Utils.isNotBlank(fname) && Utils.isNotBlank(lname)) {
			Attendee attendee = new Attendee(null, fname, lname, email, phone, profession, street, city, state, zip,
					comments, null);
			// currentActivity.getAttendees().add(attendee);
			// activityDao.save(currentActivity);
			Attendee savedAttendee = attendeeDao.saveAttendee(attendee, currentActivity.getId());
			if (savedAttendee == null || savedAttendee.getId() == null) {
				result.add("Faild to added attendee to " + currentActivity.getName());
			} else {
				result.add("Successfully added attendee to " + currentActivity.getName());
			}
		}
		request.getRequestDispatcher("/add-attendee.jsp").forward(request, response);
	}

	@SuppressWarnings("unchecked")
	private boolean validateActivityRequest(HttpServletRequest request) {
		result = (List<String>) request.getAttribute(WebConstants.REQUEST_ATTR_RESULTS);
		String activityIdStr = getCurrentActivityId(request);
		if (!Utils.validKey(activityIdStr)) {
			result.add("Invalid activityId");
		} else {
			Key activityId = KeyFactory.stringToKey(activityIdStr);
			currentActivity = activityDao.getById(activityId);
			request.setAttribute(WebConstants.REQUEST_ATTR_ACTIVITY, currentActivity);
		}
		return currentActivity != null;
	}

	private void addAttendees(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {

		request.getRequestDispatcher("/add-attendee.jsp").forward(request, response);
	}

	private void showAttendees(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
		List<Attendee> attendees = attendeeDao.getByActivityId(currentActivity.getId());
		request.setAttribute(WebConstants.REQUEST_ATTR_ATTENDEES, attendees);
		request.getRequestDispatcher("/attendee.jsp").forward(request, response);
	}

	private String getCurrentActivityId(HttpServletRequest request) {
		return request.getParameter(WebConstants.PARAM_ACTIVITY_ID);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doGet(req, resp);
	}
}
