package com.sc.cdb.data.dao;

import java.util.List;

import com.sc.cdb.data.model.prayer.Dst;
import com.sc.cdb.data.model.prayer.Prayer;

public interface PrayerConfigDao {

    // This method is not needed. It was used before implementing Prayer's Next changed
    @Deprecated
    List<Prayer> getPrayerByCompanyIdMonthAndDay(String companyId, int month, int day);

    @Deprecated
    List<Prayer> getPrayerByCompanyId(String companyId);

    boolean updateDst(String companyId, Dst dst);
}
