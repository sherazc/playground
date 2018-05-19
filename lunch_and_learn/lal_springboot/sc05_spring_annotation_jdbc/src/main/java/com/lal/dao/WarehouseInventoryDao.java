package com.lal.dao;

import com.lal.modal.Item;

import java.util.List;

public interface WarehouseInventoryDao {
    List<Item> getAll();
}
