package com.bitsegment.util;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.transaction.annotation.Transactional;

public class EntityManagerFilter implements Filter {

	private static final Log LOG = LogFactory.getLog(EntityManagerFilter.class);

	protected FilterConfig filterConfig = null;

	@Transactional
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
			ServletException {
		LOG.info("Begin Transaction.");
		chain.doFilter(request, response);
		LOG.info("Ending Transaction.");
	}

	public void init(FilterConfig config) {
		filterConfig = config;
	}

	public void destroy() {
		LOG.info("EntityManagerFilter distroyed");
	}

	public void setFilterConfig(FilterConfig filterConfig) {
		init(filterConfig);
	}

	public FilterConfig getFilterConfig() {
		return filterConfig;
	}
}