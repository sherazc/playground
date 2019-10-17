package com.sc.cdb.services.auth;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.Fund;
import com.sc.cdb.data.model.cc.GeoCode;
import com.sc.cdb.data.model.prayer.Dst;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.CentralControlRepository;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import org.apache.commons.lang3.StringUtils;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
public class CompanyCompanyDefaultsCreatorImpl implements CompanyDefaultsCreator {
    private CentralControlRepository centralControlRepository;
    private PrayerConfigRepository prayerConfigRepository;

    public CompanyCompanyDefaultsCreatorImpl(
            CentralControlRepository centralControlRepository,
            PrayerConfigRepository prayerConfigRepository) {
        this.centralControlRepository = centralControlRepository;
        this.prayerConfigRepository = prayerConfigRepository;
    }

    @Override
    public List<Object> createAndSaveIfNotExists(String companyId) {
        if (StringUtils.isBlank(companyId)) {
            return new ArrayList<>();
        }

        return Arrays.asList(
                createAndSaveCentralControlIfNotExists(companyId),
                createAndSavePrayerConfigIfNotExists(companyId)
        );
    }

    private CentralControl createAndSaveCentralControlIfNotExists(String companyId) {
        Optional<CentralControl> existingCentralControlOptional = centralControlRepository.findByCompanyId(new ObjectId(companyId));

        return existingCentralControlOptional.orElseGet(() -> {
            CentralControl emptyCentralControl = createEmptyCentralControl(companyId);
            return centralControlRepository.save(emptyCentralControl);
        });
    }

    private PrayerConfig createAndSavePrayerConfigIfNotExists(String companyId) {
        Optional<PrayerConfig> existingPrayerConfigOptional = prayerConfigRepository.findByCompanyId(new ObjectId(companyId));

        // TODO Validate if existing company have missing defaults.

        // Create and save default if they are missing.
        return existingPrayerConfigOptional.orElseGet(() -> {
            PrayerConfig emptyPrayerConfig = createEmptyPrayerConfig(companyId);
            return prayerConfigRepository.save(emptyPrayerConfig);
        });
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

    public CentralControl createEmptyCentralControl(String companyId) {
        CentralControl centralControl = new CentralControl();
        centralControl.setCompanyId(companyId);

        centralControl.setEvents(new ArrayList<>());
        centralControl.setAnnouncements(new ArrayList<>());
        centralControl.setCustomConfigurations(new ArrayList<>());
        centralControl.setExpenses(new ArrayList<>());
        centralControl.setJummahs(new ArrayList<>());
        addEmptyFunds(centralControl);

        return centralControl;
    }

    private void addEmptyFunds(CentralControl centralControl) {
        ArrayList<Fund> funds = new ArrayList<>();
        funds.add(new Fund("", 0D, 0D, 0D, null, false));
        funds.add(new Fund("", 0D, 0D, 0D, null, false));
        centralControl.setFunds(funds);
    }
}
