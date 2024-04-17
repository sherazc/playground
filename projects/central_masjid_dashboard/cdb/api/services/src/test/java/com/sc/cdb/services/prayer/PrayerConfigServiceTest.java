package com.sc.cdb.services.prayer;

import com.sc.cdb.data.dao.PrayerConfigDao;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.auth.CompanyService;
import com.sc.cdb.services.bulk.PrayerValidator;
import com.sc.cdb.services.common.CustomConfigurationsService;
import com.sc.cdb.services.common.GregorianHijriConverter;
import com.sc.cdb.services.common.GregorianHijriConverterImpl;
import com.sc.cdb.services.common.TestUtils;
import com.sc.cdb.services.dst.PrayerConfigDstApplier;
import com.sc.cdb.services.mapper.DomainMapperImpl;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.version.DbVersionService;
import com.sc.cdb.utils.CdbDateUtils;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.chrono.HijrahDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {
        PrayerConfigServiceImpl.class,
        PrayerComparator.class,
        DomainMapperImpl.class,
        PrayerHijriSetter.class, GregorianHijriConverterImpl.class})
class PrayerConfigServiceTest {

    public static final String COMPANY_ID = "5da27307f54ab6c94a693ee2";

    @Autowired
    private PrayerConfigService prayerConfigService;

    @Autowired
    private GregorianHijriConverter gregorianHijriConverter;

    @MockBean
    private PrayerConfigRepository prayerConfigRepository;

    @MockBean
    private PrayerConfigDao prayerConfigDao;

    @MockBean
    private PrayerConfigDstApplier prayerConfigDstApplier;

    @MockBean
    private CompanyService companyService;

    @Autowired
    private PrayerComparator prayerComparator;

    @MockBean
    private PrayerValidator prayerValidator;

    @MockBean
    private CustomConfigurationsService customConfigurationsService;

    @MockBean
    private DbVersionService dbVersionService;

    @BeforeEach
    void init() {
        when(prayerConfigRepository.findByCompanyId(any(ObjectId.class)))
                .thenReturn(Optional
                        .of(TestUtils.readJsonObject("PrayerConfig.json", PrayerConfig.class)));
    }


    @Test
    void getPrayerByCompanyIdMonthAndDay() {
        assertPrayerSingle(10, 1);
    }


    @Test
    void getPrayerByCompanyIdMonthAndDay_first_day() {
        assertPrayerSingle(1, 1);
    }


    @Test
    void getPrayerByCompanyIdMonthAndDay_leap_year() {
        assertPrayerSingle(2, 28);
    }

    @Test
    void getPrayerByCompanyIdMonthAndDay_last_day() {
        assertPrayerSingle(12, 31);
    }


    @Test
    void getPrayersPageByCompanyIdMonthAndDay_5days_yearStart() {
        assertPrayersPage(1, 1, 5);
    }

    @Test
    void getPrayersPageByCompanyIdMonthAndDay_10days_leapYear() {
        assertPrayersPage(2, 26, 10);
    }

    @Test
    void getPrayersPageByCompanyIdMonthAndDay_5days_yearEnd() {
        assertPrayersPage(12, 29, 10);
    }

    @Test
    void getPrayerByCompanyIdMonthAndDay_empty_fail_response() {
        assertSingleEmptyFailResponse(null, 1, 1);
        assertSingleEmptyFailResponse(COMPANY_ID, 0, 1);
        assertSingleEmptyFailResponse(COMPANY_ID, 13, 1);
        assertSingleEmptyFailResponse(COMPANY_ID, 1, 0);
        assertSingleEmptyFailResponse(COMPANY_ID, 1, 32);
    }

    @Test
    void getPrayersPageByCompanyIdMonthAndDay_empty_fail_response() {
        assertPageEmptyFailResponse(null, 1, 1, 10);
        assertPageEmptyFailResponse(COMPANY_ID, 0, 1, 10);
        assertPageEmptyFailResponse(COMPANY_ID, 13, 1, 10);
        assertPageEmptyFailResponse(COMPANY_ID, 1, 0, 10);
        assertPageEmptyFailResponse(COMPANY_ID, 1, 32, 10);
        assertPageEmptyFailResponse(COMPANY_ID, 1, 1, 0);
        assertPageEmptyFailResponse(COMPANY_ID, 1, 1, 101);
    }

    private void assertSingleEmptyFailResponse(String companyId, int month, int date) {
        // Call
        ServiceResponse<Prayer> response = prayerConfigService
                .getPrayerByCompanyIdMonthAndDay(companyId, month, date);

        // Verify
        assertNull(response.getTarget());
        assertFalse(response.isSuccessful());
    }

    private void assertPageEmptyFailResponse(String companyId, int month, int date, int length) {
        // Call
        ServiceResponse<List<Prayer>> response = prayerConfigService
                .getPrayersPageByCompanyIdMonthAndDay(companyId, month, date, length);

        // Verify
        assertNull(response.getTarget());
        assertFalse(response.isSuccessful());
    }


    private void assertPrayerSingle(int month, int date) {
        // Call
        ServiceResponse<Prayer> response = prayerConfigService
                .getPrayerByCompanyIdMonthAndDay(COMPANY_ID, month, date);

        // Verify
        assertNotNull(response.getTarget());

        Calendar today = CdbDateUtils.todayUtc();
        Calendar testPrayerDate = CdbDateUtils.createCalendar(today.get(Calendar.YEAR), month, date).get();
        assertPrayer(testPrayerDate, response.getTarget());
    }

    private void assertPrayersPage(int month, int day, int pageSize) {

        // Call
        ServiceResponse<List<Prayer>> response = prayerConfigService
                .getPrayersPageByCompanyIdMonthAndDay(COMPANY_ID, month, day, pageSize);

        // Verify
        assertNotNull(response.getTarget());
        assertEquals(pageSize, response.getTarget().size());

        Calendar today = CdbDateUtils.todayUtc();
        Calendar testPrayerDate = CdbDateUtils.createCalendar(today.get(Calendar.YEAR), month, day).get();

        response.getTarget().forEach(p -> {
            assertPrayer(testPrayerDate, p);
            testPrayerDate.add(Calendar.DATE, 1);
        });
    }


    private void assertPrayer(Calendar today, Prayer prayer) {
        Date prayerDate = prayer.getDate();
        assertEquals(today.get(Calendar.YEAR), CdbDateUtils.extractDateField(prayerDate, Calendar.YEAR));
        assertEquals(today.get(Calendar.MONTH), CdbDateUtils.extractDateField(prayerDate, Calendar.MONTH));
        assertEquals(today.get(Calendar.DATE), CdbDateUtils.extractDateField(prayerDate, Calendar.DATE));

        assertPrayerTime(today, prayer.getDate(), prayer.getFajr(), prayer.getFajrIqama(),
                prayer.getFajrChangeDate(), prayer.getFajrChange());
        assertPrayerTime(today, prayer.getDate(), prayer.getDhuhr(), prayer.getDhuhrIqama(),
                prayer.getDhuhrChangeDate(), prayer.getDhuhrChange());
        assertPrayerTime(today, prayer.getDate(), prayer.getAsr(), prayer.getAsrIqama(),
                prayer.getAsrChangeDate(), prayer.getAsrChange());
        assertPrayerTime(today, prayer.getDate(), prayer.getMaghrib(), prayer.getMaghribIqama(),
                prayer.getMaghribChangeDate(), prayer.getMaghribChange());
        assertPrayerTime(today, prayer.getDate(), prayer.getIsha(), prayer.getIshaIqama(),
                prayer.getIshaChangeDate(), prayer.getIshaChange());

        assertEquals(dateToHijriString(prayerDate), prayer.getHijriString());
    }

    private void assertPrayerTime(Calendar today, Date prayerDate, String azan, String iqama, Date changeDate, String change) {
        assertEquals(today.getTime(), prayerDate);
        if (changeDate != null) {
            boolean a = prayerDate.before(changeDate);
            if (!a) {
                System.out.println("fail"); // TODO remove it. Added for debugging
            }
            assertTrue(prayerDate.before(changeDate));
        }

        Optional<Calendar> azanCalendar = CdbDateUtils.parseTimeString(azan);
        Optional<Calendar> iqamaCalendar = CdbDateUtils.parseTimeString(iqama);
        Optional<Calendar> changeCalendar = CdbDateUtils.parseTimeString(change);

        assertTrue(azanCalendar.isPresent());

        iqamaCalendar.ifPresent(i -> {
            assertTrue(i.after(azanCalendar.get()));
            changeCalendar.ifPresent(c -> assertNotEquals(c, i));
        });
    }

    private String dateToHijriString(Date date) {
        HijrahDate hijrahDate = gregorianHijriConverter.fromGregorian(date);
        return PrayerHijriSetter.dateFormatter.format(hijrahDate);
    }
}
