package com.sc.cdb.services.auth;

import java.util.ArrayList;
import java.util.List;

import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.GeoCode;
import com.sc.cdb.data.model.prayer.Dst;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.CentralControlRepository;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import org.springframework.stereotype.Service;

@Service
public class CompanyDefaultsCreatorImpl implements CompanyDefaultsCreator{
    private CentralControlRepository centralControlRepository;
    private PrayerConfigRepository prayerConfigRepository;

    public CompanyDefaultsCreatorImpl(
            CentralControlRepository centralControlRepository,
            PrayerConfigRepository prayerConfigRepository) {
        this.centralControlRepository = centralControlRepository;
        this.prayerConfigRepository = prayerConfigRepository;
    }

    @Override
    public List<Object> createAndSave(String companyId) {
        List<Object> createdEntities = new ArrayList<>();
        CentralControl centralControl = createEmptyCentralControl(companyId);
        PrayerConfig prayerConfig = createEmptyPrayerConfig(companyId);

        createdEntities.add(centralControlRepository.save(centralControl));
        createdEntities.add(prayerConfigRepository.save(prayerConfig));

        return createdEntities;
    }

    public PrayerConfig createEmptyPrayerConfig(String companyId) {
        PrayerConfig prayerConfig = new PrayerConfig();
        prayerConfig.setCompanyId(companyId);
        prayerConfig.setLocation("");
        prayerConfig.setCalculationMethod(2);
        prayerConfig.setAsrJuristicMethod(0);

        prayerConfig.setDst(new Dst());
        prayerConfig.setGeoCode(new GeoCode());
        prayerConfig.setPrayerOffsetMinutes(new int[0]);

        return prayerConfig;
    }

    private CentralControl createEmptyCentralControl(String companyId) {
        CentralControl centralControl = new CentralControl();
        centralControl.setCompanyId(companyId);

        centralControl.setEvents(new ArrayList<>());
        centralControl.setAnnouncements(new ArrayList<>());
        centralControl.setCustomConfigurations(new ArrayList<>());
        centralControl.setFunds(new ArrayList<>());
        centralControl.setExpenses(new ArrayList<>());
        centralControl.setJummahs(new ArrayList<>());

        return centralControl;
    }
}
