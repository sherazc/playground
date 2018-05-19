package com.lal.sb.dao;

import com.lal.sb.entity.SiteInventoryItem;

import java.util.List;

public interface SiteInventoryDao {

    List<SiteInventoryItem> getAll();

    void save(SiteInventoryItem siteInventoryItem);
}
