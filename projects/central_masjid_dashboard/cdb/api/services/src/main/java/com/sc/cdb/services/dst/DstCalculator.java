package com.sc.cdb.services.dst;

import java.util.Date;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Dst;

public interface DstCalculator {
    Optional<Date[]> dstPeriod(int year);
    Optional<Date[]> dstPeriod(Dst dst, int year);
}
