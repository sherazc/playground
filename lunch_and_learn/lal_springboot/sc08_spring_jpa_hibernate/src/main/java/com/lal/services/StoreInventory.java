package com.lal.services;

import com.lal.modal.Item;
import org.hibernate.Session;

import java.util.List;

public interface StoreInventory {

    void storeItemInSite(Item item);

    void storeItemInWarehouse(Item item);

    List<Item> findAllInventory();
}
