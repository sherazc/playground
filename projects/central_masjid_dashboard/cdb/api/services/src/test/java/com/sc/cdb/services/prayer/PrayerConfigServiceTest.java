package com.sc.cdb.services.prayer;

import com.sc.cdb.data.dao.PrayerConfigDao;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.auth.CompanyService;
import com.sc.cdb.services.bulk.PrayerValidator;
import com.sc.cdb.services.common.CustomConfigurationsService;
import com.sc.cdb.services.dst.PrayerConfigDstApplier;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.version.DbVersionService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {
        PrayerConfigServiceImpl.class,
        PrayerComparator.class
})
class PrayerConfigServiceTest {

    @Autowired
    private PrayerConfigService prayerConfigService;

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

    @Test
    void getPrayersPageByCompanyIdMonthAndDay() {
        ServiceResponse<List<Prayer>> response = prayerConfigService.getPrayersPageByCompanyIdMonthAndDay("5da27307f54ab6c94a693ee2", 1, 1, 1);
        assertNotNull(response.getTarget());
        assertEquals(1, response.getTarget().size());
    }
}