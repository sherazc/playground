package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.prayer.Prayer;

public class PrayerDaoImpl extends BaseDaoImpl<Prayer> implements PrayerDao {
    @Override
    Class getType() {
        return Prayer.class;
    }
}
