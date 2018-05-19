package com.lal;

import com.lal.dao.SiteInventoryDao;
import com.lal.dao.SiteInventoryDaoImpl;
import com.lal.dao.WarehouseInventoryDao;
import com.lal.dao.WarehouseInventoryDaoImpl;
import com.lal.datasource.ConnectionUtil;
import com.lal.modal.Item;
import com.lal.services.DbInitializer;
import com.lal.services.StoreInventory;
import com.lal.services.StoreInventoryImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

public class App {
    public static void main( String[] args ) {
        try {
            DbInitializer.initialize(ConnectionUtil.createConnection());
        } catch (Exception e) {
            e.printStackTrace();
        }

        SiteInventoryDao siteInventoryDao = new SiteInventoryDaoImpl();
        WarehouseInventoryDao warehouseInventoryDao = new WarehouseInventoryDaoImpl();

        StoreInventory storeInventory = new StoreInventoryImpl(siteInventoryDao, warehouseInventoryDao);

        List<Item> allInventory = storeInventory.findAllInventory();

        allInventory.forEach(item -> {
            System.out.format("%d, %s, %.2f\n", item.getId(), item.getName(), item.getPrice());
        });
    }
}
