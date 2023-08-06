package com.sc.cdb.services.dst;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.Dst;
import com.sc.cdb.utils.CdbDateUtils;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class DstCalculatorTest {

    private DstCalculator dstCalculator;
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");

    @Before
    public void setUp() throws Exception {
        // MockitoAnnotations.initMocks(this);
        // TODO: Use mocks instead of new DateTimeCalculatorImpl()
        dstCalculator = new DstCalculatorImpl();
    }

    @Test
    public void dstPeriod_calculateValidYears() {
        validate(dstCalculator.dstPeriod(2007), "2007-03-11", "2007-11-04");
        validate(dstCalculator.dstPeriod(2008), "2008-03-09", "2008-11-02");
        validate(dstCalculator.dstPeriod(2009), "2009-03-08", "2009-11-01");
        validate(dstCalculator.dstPeriod(2010), "2010-03-14", "2010-11-07");
        validate(dstCalculator.dstPeriod(2011), "2011-03-13", "2011-11-06");
        validate(dstCalculator.dstPeriod(2012), "2012-03-11", "2012-11-04");
        validate(dstCalculator.dstPeriod(2013), "2013-03-10", "2013-11-03");
        validate(dstCalculator.dstPeriod(2014), "2014-03-09", "2014-11-02");
        validate(dstCalculator.dstPeriod(2015), "2015-03-08", "2015-11-01");
        validate(dstCalculator.dstPeriod(2016), "2016-03-13", "2016-11-06");
        validate(dstCalculator.dstPeriod(2017), "2017-03-12", "2017-11-05");
        validate(dstCalculator.dstPeriod(2018), "2018-03-11", "2018-11-04");
        validate(dstCalculator.dstPeriod(2019), "2019-03-10", "2019-11-03");
        validate(dstCalculator.dstPeriod(2020), "2020-03-08", "2020-11-01");
        validate(dstCalculator.dstPeriod(2021), "2021-03-14", "2021-11-07");
        validate(dstCalculator.dstPeriod(2022), "2022-03-13", "2022-11-06");
        validate(dstCalculator.dstPeriod(2023), "2023-03-12", "2023-11-05");
        validate(dstCalculator.dstPeriod(2024), "2024-03-10", "2024-11-03");
        validate(dstCalculator.dstPeriod(2025), "2025-03-09", "2025-11-02");
        validate(dstCalculator.dstPeriod(2026), "2026-03-08", "2026-11-01");
        validate(dstCalculator.dstPeriod(2027), "2027-03-14", "2027-11-07");
        validate(dstCalculator.dstPeriod(2028), "2028-03-12", "2028-11-05");
        validate(dstCalculator.dstPeriod(2029), "2029-03-11", "2029-11-04");
    }

    @Test
    public void dstPeriod_calculateInvalidYears() {
        Optional<Date[]> dstPeriod = dstCalculator.dstPeriod(-1);
        Assert.assertTrue(dstPeriod.isEmpty());
    }

    @Test
    public void dstPeriod_manualConfiguredValid() {
        Dst dst = createDst(true, false, "1/5", "1/8");
        validate(dstCalculator.dstPeriod(dst, 2015), "2015-01-05", "2015-01-08");

        dst = createDst(true, false, "12/22", "12/28");
        validate(dstCalculator.dstPeriod(dst, 2015), "2015-12-22", "2015-12-28");
    }


    @Test
    public void dstPeriod_manualConfiguredInvalid() {
        Dst dst = createDst(true, false, "1/8", "1/5");
        validate(dstCalculator.dstPeriod(dst, 2015), "2015-03-08", "2015-11-01");
        Assert.assertTrue(dstCalculator.dstPeriod(dst, -1).isEmpty());
    }

    @Test
    public void dstPeriod_manualConfiguredDisabledOrNull() {
        Dst dst = createDst(false, false, "1/5", "1/8");
        Assert.assertTrue(dstCalculator.dstPeriod(dst, 2015).isEmpty());
        Assert.assertTrue(dstCalculator.dstPeriod(null, 2015).isEmpty());
    }

    // https://www.juandebravo.com/2015/04/10/java-yyyy-date-format/
    // Use yyyy instead of YYYY to format year
    @SuppressWarnings("Duplicates")
    @Test
    public void testDateFormatIssue() {
        Calendar calendar = CdbDateUtils.todayUtc();
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        calendar.set(Calendar.YEAR, 2015);
        calendar.set(Calendar.MONTH, 11);
        calendar.set(Calendar.DATE, 31);

        System.out.println(calendar.getTime());
        System.out.println(calendar.get(Calendar.YEAR));

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        System.out.println(sdf.format(calendar.getTime()));

        try {
            String date_s = "2014-12-31";
            SimpleDateFormat dt = new SimpleDateFormat("yyyy-MM-dd");
            Date d = dt.parse(date_s);
            SimpleDateFormat dt1 = new SimpleDateFormat("YYYY");
            System.out.println("And the year is... " + dt1.format(d));
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    private Dst createDst(Boolean enable, Boolean automaticCalculate, String beginMonthDate, String endMonthDate) {
        Dst dst = new Dst();
        dst.setEnable(enable);
        dst.setAutomaticCalculate(automaticCalculate);
        dst.setBeginMonthDate(beginMonthDate);
        dst.setEndMonthDate(endMonthDate);
        return dst;
    }

    @SuppressWarnings("OptionalUsedAsFieldOrParameterType")
    private void validate(Optional<Date[]> dstPeriod, String beginDateString, String endDateString) {
        Assert.assertTrue(dstPeriod.isPresent());
        Date beginDstPeriod = dstPeriod.get()[0];
        Date endDstPeriod = dstPeriod.get()[1];

        Assert.assertTrue(beginDstPeriod.before(endDstPeriod));
        Assert.assertEquals(beginDateString, DATE_FORMAT.format(beginDstPeriod));
        Assert.assertEquals(endDateString, DATE_FORMAT.format(endDstPeriod));
    }
}