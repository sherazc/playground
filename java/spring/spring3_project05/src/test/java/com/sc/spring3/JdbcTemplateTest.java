package com.sc.spring3;

import java.util.List;
import java.util.Map;

import junit.framework.TestCase;

import org.springframework.jdbc.core.simple.SimpleJdbcTemplate;

import com.sc.spring3.utils.BeanUtils;

public class JdbcTemplateTest extends TestCase {

	public void testJdbcTemplateBean() {
		SimpleJdbcTemplate simpleJdbcTemplate = (SimpleJdbcTemplate) BeanUtils.getBean("simpleJdbcTemplate");
		assert simpleJdbcTemplate != null;
		simpleJdbcTemplate.getJdbcOperations().execute("CREATE TABLE T1 (ID INTEGER PRIMARY KEY, NAME VARCHAR(255)) ");
		simpleJdbcTemplate.update("INSERT INTO T1 (ID, NAME) VALUES (?,?)", 100, "Name1");
		simpleJdbcTemplate.update("INSERT INTO T1 (ID, NAME) VALUES (?,?)", 200, "Name2");

		simpleJdbcTemplate.update("INSERT INTO T1 (ID, NAME) VALUES (?,?)", 300, "Name3");
		List<Map<String, Object>> result = simpleJdbcTemplate.queryForList("SELECT ID, NAME FROM T1 WHERE NAME LIKE ?",
				"Name%");

		for (Map<String, Object> row : result) {
			System.out.println(row.get("ID") + " " + row.get("NAME"));

		}

		simpleJdbcTemplate.getJdbcOperations().execute("DROP TABLE T1");

	}
}
