package com.lal.services;

import com.lal.modal.Item;

import java.util.List;

public interface StoreInventory {
    List<Item> findAllInventory();
}
