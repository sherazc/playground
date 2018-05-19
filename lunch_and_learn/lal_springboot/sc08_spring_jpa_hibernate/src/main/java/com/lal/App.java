package com.lal;

import com.lal.modal.Item;
import com.lal.services.StoreInventory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;

public class App {
    public static void main(String[] args) {


        BeanFactory beanFactory = new AnnotationConfigApplicationContext(SpringConfigs.class);

        StoreInventory storeInventory = beanFactory.getBean(StoreInventory.class);
        List<Item> items = storeInventory.findAllInventory();
        items.forEach(item -> System.out.format("%d, %s, %.2f\n", item.getId(), item.getName(), item.getPrice()));


        /*
        // Initializing
        DbInitializer.initialize(ConnectionUtil.getEmf().createEntityManager());

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

        ConnectionUtil.getEmf().close();
        */

    }
}
