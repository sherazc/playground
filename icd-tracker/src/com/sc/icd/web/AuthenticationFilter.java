package com.sc.icd.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import com.sc.icd.domain.TrackerUser;

public class AuthenticationFilter implements Filter {

	private List<String> noAuthUrls = new ArrayList<String>();

	@Override
	public void destroy() {
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
			ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		TrackerUser trackerUser = (TrackerUser) httpRequest.getSession().getAttribute(WebConstants.SESSION_ATTR_TRACKER_USER);
		String action = request.getParameter(WebConstants.PARAM_ACTION);

		String requestUri = httpRequest.getRequestURI();

		List<String> result = new ArrayList<String>();
		request.setAttribute(WebConstants.REQUEST_ATTR_RESULTS, result);
		

		if (trackerUser == null && !WebConstants.PARAM_VALUE_LOGIN.equals(action)
				&& !avoidAuthenticationUri(requestUri)) {
			httpRequest.getRequestDispatcher("/login.jsp").forward(httpRequest, response);
		} else {

			chain.doFilter(request, response);
		}
	}

	private boolean avoidAuthenticationUri(String requestUri) {
		if (requestUri == null) {
			return false;
		}
		boolean result = false;
		for (String uriPart : noAuthUrls) {
			if (requestUri.contains(uriPart)) {
				result = true;
				break;
			}
		}
		return result;
	}

	@Override
	public void init(FilterConfig config) throws ServletException {
		String noAuthUrlsStr = config.getInitParameter(WebConstants.INIT_PARAM_NO_AUTH_URLS);
		if (noAuthUrlsStr != null) {
			StringTokenizer noAuthUrlsTokenizer = new StringTokenizer(noAuthUrlsStr, ",");
			while (noAuthUrlsTokenizer.hasMoreTokens()) {
				noAuthUrls.add(noAuthUrlsTokenizer.nextToken().trim());
			}
		}
	}

}
