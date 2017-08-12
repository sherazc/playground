package com.sc.gae.dao.utils;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class EntityManagerFilter implements Filter {

	private static final Logger LOG = Logger
			.getLogger(EntityManagerFilter.class.getName());

	protected FilterConfig filterConfig = null;

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		try {
			EMF.beginTransaction();

			chain.doFilter(request, response);
			EMF.commitTransaction();

		} catch (Exception e) {
			LOG.severe("Service Error. " + e.getMessage());
			try {
				EMF.rollbackTransaction();
			} catch (Throwable t) {
				LOG.severe("Error rollbacking. " + t.getMessage());
			}
		} finally {
			try {
				EMF.closeEntityManager();
			} catch (Throwable t) {
				LOG.severe("Error closing EntityManager. " + t.getMessage());
			}
		}
	}

	public void init(FilterConfig config) {
		filterConfig = config;
		// destroy();
	}

	public void destroy() {
		if (EMF.getEMF() != null) {
			LOG.info("Closing EntityManagerFactory.");
			EMF.getEMF().close();
		}
	}

	public void setFilterConfig(FilterConfig filterConfig) {
		init(filterConfig);
	}

	public FilterConfig getFilterConfig() {
		return filterConfig;
	}
}