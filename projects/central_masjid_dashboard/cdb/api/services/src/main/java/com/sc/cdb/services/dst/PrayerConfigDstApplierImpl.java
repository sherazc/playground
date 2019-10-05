package com.sc.cdb.services.dst;

import java.util.Date;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.services.date.DateService;
import org.springframework.stereotype.Service;

@Service
public class PrayerConfigDstApplierImpl implements PrayerConfigDstApplier {

    private DstCalculator dstCalculator;
    private DateService dateService;

    public PrayerConfigDstApplierImpl(DstCalculator dstCalculator, DateService dateService) {
        this.dstCalculator = dstCalculator;
        this.dateService = dateService;
    }


    @Override
    public void addHour(PrayerConfig prayerConfig, int year) {
        if (!shouldApplyDst(prayerConfig)) {
            return;
        }
        Optional<Date[]> dstPeriodOptional = dstCalculator.dstPeriod(prayerConfig.getDst(), year);

    }

    private boolean shouldApplyDst(PrayerConfig prayerConfig) {
        return prayerConfig != null
                && prayerConfig.getDst() != null
                && prayerConfig.getDst().getEnable() != null
                && prayerConfig.getDst().getEnable()
                && prayerConfig.getPrayers() != null
                && !prayerConfig.getPrayers().isEmpty();
    }

    @Override
    public void removeHour(PrayerConfig prayerConfig, int year) {
    }
}
