package com.lal.sb.services;

import com.lal.sb.modal.Item;
import org.hibernate.Session;

import java.util.List;

public interface StoreInventory {

    void storeItemInSite(Item item);

    void storeItemInWarehouse(Item item);

    List<Item> findAllInventory();
}
