package com.sc.spring3.db.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;

public abstract class BaseDao<T> {

	private SimpleJdbcTemplate jdbcTemplate;
	public List<T> getAll() {
		List<Map<String, Object>> result = getJdbcTemplate().queryForList(getAllQuery());
		List<T> addresses = new ArrayList<T>();

		if (result != null) {
			for (Map<String, Object> row : result) {
				addresses.add(rowToAddress(row));
			}
		}

		return addresses;
	}

	public abstract String getAllQuery();

	public abstract T rowToAddress(Map<String, Object> row);

	public SimpleJdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(SimpleJdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
}
