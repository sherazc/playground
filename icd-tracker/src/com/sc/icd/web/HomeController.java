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

public class HomeController extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private TrackerUserDao trackerUserDao;
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		trackerUserDao = new TrackerUserDaoImpl();
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String action = request.getParameter(WebConstants.PARAM_ACTION);

		if (WebConstants.PARAM_VALUE_LOGIN.equals(action)) {
			login(request, response);
		} else if (WebConstants.PARAM_VALUE_LOGOUT.equals(action)) {
			logout(request, response);
		} else {
			if (loggedin(request)) {
				response.sendRedirect(response.encodeRedirectURL("/activities"));
			} else {
				request.getRequestDispatcher("/login.jsp").forward(request, response);
			}
		}
	}

	private void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		TrackerUser user = (TrackerUser) request.getSession().getAttribute(WebConstants.SESSION_ATTR_TRACKER_USER);
		if (user != null) {
			request.getSession().removeAttribute(WebConstants.SESSION_ATTR_TRACKER_USER);
		}
		response.sendRedirect(response.encodeRedirectURL("/home"));
	}

	@SuppressWarnings("unchecked")
	private void login(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String forwardTo = "/login.jsp";
		List<String> result = (List<String>) request.getAttribute(WebConstants.REQUEST_ATTR_RESULTS);
		
		String name = Utils.getParameter(request, WebConstants.PARAM_LOGIN_NAME);
		String password = Utils.getParameter(request, WebConstants.PARAM_LOGIN_PASSWORD);

		if (name == null || name.length() < 1) {
			result.add("Name is blank");
		}
		if (password == null || password.length() < 1) {
			result.add("Password is blank");
		}

		if (name != null && name.length() > 0 && password != null && password.length() > 0) {
			TrackerUser user = trackerUserDao.getByNamePassword(name, password);
			if (user == null) {
				result.add("The name " + name + " or the password you entered is incorrect");
			} else {
				request.getSession().setAttribute(WebConstants.SESSION_ATTR_TRACKER_USER, user);
				response.sendRedirect(response.encodeRedirectURL("/activities"));
				return;
			}
		}
		request.getRequestDispatcher(forwardTo).forward(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		this.doGet(req, resp);
	}

	private boolean loggedin(HttpServletRequest request) {
		return request.getSession().getAttribute(WebConstants.SESSION_ATTR_TRACKER_USER) != null;
	}
}
