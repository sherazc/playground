package com.sc.icd.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sc.icd.dao.TrackerUserDao;
import com.sc.icd.dao.TrackerUserDaoImpl;
import com.sc.icd.domain.TrackerUser;
import com.sc.icd.utils.Utils;

public class AdminController extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private TrackerUserDao trackerUserDao;

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		trackerUserDao = new TrackerUserDaoImpl();
	}

	@SuppressWarnings("unchecked")
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String forwardTo = "/create-admin.jsp";
		String action = request.getParameter(WebConstants.PARAM_ACTION);

		List<String> result = (List<String>) request.getAttribute(WebConstants.REQUEST_ATTR_RESULTS);

		if (WebConstants.PARAM_VALUE_CREATE_USER.equals(action)) {
			String name = Utils.getParameter(request, WebConstants.PARAM_LOGIN_NAME);
			String password = Utils.getParameter(request, WebConstants.PARAM_LOGIN_PASSWORD);
			if (name == null || name.length() < 1) {
				result.add("Name is blank");
			}
			if (password == null || password.length() < 1) {
				result.add("Password is blank");
			}
			if (name != null && name.length() > 0) {
				TrackerUser user = trackerUserDao.getByName(name);
				if (user != null) {
					result.add("User " + name + " already exists");
				} else {
					if (password != null && password.length() > 0) {
						TrackerUser newTrackerUser = new TrackerUser(name, password, false);
						if (trackerUserDao.save(newTrackerUser) != null) {
							result.add("User " + name + " successfull created");
						}
					}
				}
			}
		}

		request.getRequestDispatcher(forwardTo).forward(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doGet(req, resp);
	}
}
