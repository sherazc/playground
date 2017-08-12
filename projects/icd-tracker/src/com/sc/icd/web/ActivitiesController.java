package com.sc.icd.web;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.KeyFactory;
import com.sc.icd.dao.ActivityDao;
import com.sc.icd.dao.ActivityDaoImpl;
import com.sc.icd.domain.Activity;
import com.sc.icd.utils.Utils;

public class ActivitiesController extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private ActivityDao activityDao;

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		activityDao = new ActivityDaoImpl();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<Activity> activities = activityDao.getAll();
		request.setAttribute(WebConstants.REQUEST_ATTR_ALL_ACTIVITIES, activities);
		String action = request.getParameter(WebConstants.PARAM_ACTION);

		if (WebConstants.PARAM_VALUE_ADD.equals(action)) {
			request.getRequestDispatcher("/add-activity.jsp").forward(request, response);
		} else if (WebConstants.PARAM_VALUE_DELETE.equals(action)) {
			deleteActivity(request, response);
		} else if (WebConstants.PARAM_VALUE_CREATE_ACTIVITY.equals(action)) {
			createActivity(request, response);
		} else {
			request.getRequestDispatcher("/activities.jsp").forward(request, response);
		}
	}

	@SuppressWarnings("unchecked")
	private void createActivity(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		List<String> result = (List<String>) request.getAttribute(WebConstants.REQUEST_ATTR_RESULTS);
		String name = Utils.getParameter(request, WebConstants.PARAM_LOGIN_NAME);
		String description = Utils.getParameter(request, WebConstants.PARAM_DESCRIPTION);

		if (name == null || name.length() < 1) {
			result.add("Please enter a valid name");
			request.getRequestDispatcher("/add-activity.jsp").forward(request, response);
		} else {
			Activity activity = activityDao.save(new Activity(null, name, new Date(), description));
			if (activity != null && activity.getId() != null) {
				result.add("Successfully created activity " + name);
			} else {
				result.add("Failed to create activity " + name);
			}
			response.sendRedirect(response.encodeRedirectURL("/activities"));
		}
	}

	private void deleteActivity(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String idStr = request.getParameter(WebConstants.PARAM_ID);
		if (Utils.validKey(idStr)) {
			activityDao.removeById(KeyFactory.stringToKey(idStr));
			response.sendRedirect(response.encodeRedirectURL("/activities"));
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doGet(req, resp);
	}
}
