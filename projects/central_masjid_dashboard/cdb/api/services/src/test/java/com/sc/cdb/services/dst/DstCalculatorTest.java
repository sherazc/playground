package com.sc.cdb.services.dst;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class DstCalculatorTest {

    private DstCalculator dstCalculator;
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("YYYY-MM-dd");

    @Before
    public void setUp() throws Exception {
        dstCalculator = new DstCalculatorImpl();
    }

    @Test
    public void testCalculate() {
        validate(dstCalculator.calculate(2007), "2007-03-11", "2007-11-04");
        validate(dstCalculator.calculate(2008), "2008-03-09", "2008-11-02");
        validate(dstCalculator.calculate(2009), "2009-03-08", "2009-11-01");
        validate(dstCalculator.calculate(2010), "2010-03-14", "2010-11-07");
        validate(dstCalculator.calculate(2011), "2011-03-13", "2011-11-06");
        validate(dstCalculator.calculate(2012), "2012-03-11", "2012-11-04");
        validate(dstCalculator.calculate(2013), "2013-03-10", "2013-11-03");
        validate(dstCalculator.calculate(2014), "2014-03-09", "2014-11-02");
        validate(dstCalculator.calculate(2015), "2015-03-08", "2015-11-01");
        validate(dstCalculator.calculate(2016), "2016-03-13", "2016-11-06");
        validate(dstCalculator.calculate(2017), "2017-03-12", "2017-11-05");
        validate(dstCalculator.calculate(2018), "2018-03-11", "2018-11-04");
        validate(dstCalculator.calculate(2019), "2019-03-10", "2019-11-03");
        validate(dstCalculator.calculate(2020), "2020-03-08", "2020-11-01");
        validate(dstCalculator.calculate(2021), "2021-03-14", "2021-11-07");
        validate(dstCalculator.calculate(2022), "2022-03-13", "2022-11-06");
        validate(dstCalculator.calculate(2023), "2023-03-12", "2023-11-05");
        validate(dstCalculator.calculate(2024), "2024-03-10", "2024-11-03");
        validate(dstCalculator.calculate(2025), "2025-03-09", "2025-11-02");
        validate(dstCalculator.calculate(2026), "2026-03-08", "2026-11-01");
        validate(dstCalculator.calculate(2027), "2027-03-14", "2027-11-07");
        validate(dstCalculator.calculate(2028), "2028-03-12", "2028-11-05");
        validate(dstCalculator.calculate(2029), "2029-03-11", "2029-11-04");
    }

    private void validate(Date[] dstRange, String beginDateString, String endDateString) {
        Assert.assertEquals(beginDateString, DATE_FORMAT.format(dstRange[0]));
        Assert.assertEquals(endDateString, DATE_FORMAT.format(dstRange[1]));
    }
}