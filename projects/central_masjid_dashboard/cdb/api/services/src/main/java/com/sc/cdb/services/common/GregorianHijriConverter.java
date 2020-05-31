package com.sc.cdb.services.common;

import java.time.chrono.HijrahDate;
import java.util.Date;

public interface GregorianHijriConverter {
    HijrahDate fromGregorian(Date date);
    Date fromHijri(HijrahDate hijrahDate);
}
