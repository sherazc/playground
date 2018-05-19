package com.lal.dao;

import com.lal.modal.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class WarehouseInventoryDaoImpl implements WarehouseInventoryDao {

    private NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public WarehouseInventoryDaoImpl(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Item> getAll() {
        return jdbcTemplate.query("SELECT ID, NAME, PRICE FROM WAREHOUSE_INVENTORY", new RowMapper<Item>() {
            @Nullable
            @Override
            public Item mapRow(ResultSet rs, int rowNum) throws SQLException {
                return new Item(
                        rs.getLong("ID"),
                        rs.getString("NAME"),
                        rs.getDouble("PRICE"));
            }
        });
    }
}
