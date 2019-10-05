package com.sc.cdb.services.dst;

import java.util.Date;
import java.util.regex.Pattern;

import com.sc.cdb.data.model.prayer.Dst;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import org.springframework.stereotype.Service;

@Service
public class PrayerConfigDstApplierImpl implements PrayerConfigDstApplier {

    private static final String MONTH_DATE_REGEX = "^(0[1-9]|1[0-2]|0?[1-9])\\/(0[1-9]|[12]\\d|3[01]|0?[1-9])$";

    private static final Pattern MONTH_DATE_REGEX_PATTERN =
            Pattern.compile(PrayerConfigDstApplierImpl.MONTH_DATE_REGEX);

    private DstCalculator dstCalculator;

    public PrayerConfigDstApplierImpl(DstCalculator dstCalculator) {
        this.dstCalculator = dstCalculator;
    }


    @Override
    public void addHour(PrayerConfig prayerConfig, int year) {
        if (!shouldApplyDst(prayerConfig)) {
            return;
        }

        Date[] dstRange = getDstRange(prayerConfig.getDst(), year);

    }

    private Date[] getDstRange(Dst dst, int year) {
        Date[] dstRange = null;

        if (dst != null
                && !dst.getAutomaticCalculate()

        ) {

        } else {

        }

        return this.dstCalculator.calculate(year);
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
