package com.sc.todo.repository;

import com.sc.todo.dto.Todo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TodoRepository {

    private final JdbcTemplate jdbcTemplate;

    public TodoRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Todo> findAll() {
        return jdbcTemplate.query(
                "SELECT id, text FROM todo",
                (rs, rowNum) -> new Todo(rs.getLong("id"), rs.getString("text")));
    }

    public void save(String text) {
        jdbcTemplate.update("INSERT INTO todo(text) VALUES (?)", text);
    }
}
