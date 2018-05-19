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

import java.util.List;

public class App {
    public static void main(String[] args) {
        // Initializing
        DbInitializer.initialize(ConnectionUtil.getSessionFactory().openSession());

        // Creating Services and DAOs
        SiteInventoryDao siteInventoryDao = new SiteInventoryDaoImpl();
        WarehouseInventoryDao warehouseInventoryDao = new WarehouseInventoryDaoImpl();
        StoreInventory storeInventory = new StoreInventoryImpl(siteInventoryDao, warehouseInventoryDao);

        // Saving new Items in Site and Warehouse
        Item siteItem = new Item(null, "New Site Item", 400);
        Item warehouseItem = new Item(null, "New Warehouse Item", 600);
        storeInventory.storeItemInSite(siteItem);
        storeInventory.storeItemInWarehouse(warehouseItem);

        // Getting all Items from
        List<Item> items = storeInventory.findAllInventory();
        items.forEach(item -> System.out.format("%d, %s, %.2f\n", item.getId(), item.getName(), item.getPrice()));

        ConnectionUtil.getSessionFactory().close();
    }
}
