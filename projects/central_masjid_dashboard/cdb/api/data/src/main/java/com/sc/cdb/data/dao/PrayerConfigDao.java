package com.sc.cdb.data.dao;

import com.sc.cdb.data.model.prayer.Prayer;

public interface PrayerConfigDao {
    Prayer getPrayerByMonthDay(int month, int dayOfMonth);
}
