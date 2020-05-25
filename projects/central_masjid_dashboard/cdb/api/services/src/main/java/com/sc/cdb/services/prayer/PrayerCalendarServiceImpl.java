package com.sc.cdb.services.prayer;

import java.util.List;
import java.util.Optional;

import com.sc.cdb.data.model.prayer.CalenderType;
import com.sc.cdb.data.model.prayer.HijriMonth;
import com.sc.cdb.data.model.prayer.Prayer;
import com.sc.cdb.data.model.prayer.PrayerConfig;
import com.sc.cdb.data.repository.PrayerConfigRepository;
import com.sc.cdb.services.model.ServiceResponse;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
public class PrayerCalendarServiceImpl implements PrayerCalendarService {

    private PrayerConfigRepository prayerConfigRepository;

    public PrayerCalendarServiceImpl(PrayerConfigRepository prayerConfigRepository) {
        this.prayerConfigRepository = prayerConfigRepository;
    }

    @Override
    public ServiceResponse<List<Prayer>> calendar(String companyId, CalenderType calenderType, int userYear, int userMonth) {

        ServiceResponse.ServiceResponseBuilder<List<Prayer>> response = ServiceResponse.builder();

        if (!ObjectId.isValid(companyId)) {
            response.message("Invalid companyId. " + companyId);
            return response.build();
        }

        if (userYear < 0 || userYear > 3000) {
            response.message("Invalid year. " + userYear);
            return response.build();
        }

        if (userMonth < 1 || userMonth > 12) {
            response.message("Invalid month. " + userYear);
            return response.build();
        }

        Optional<PrayerConfig> prayerConfigOptional = prayerConfigRepository.findByCompanyId(new ObjectId(companyId));

        if (prayerConfigOptional.isEmpty()
                || prayerConfigOptional.get().getPrayers() == null
                || prayerConfigOptional.get().getPrayers().size() < 366) {
            response.message("Can not find prayers. Maybe Prayers are not setup yet. " + companyId);
            return response.build();
        }

        List<Prayer> prayers = prayerConfigOptional.get().getPrayers();

        if (CalenderType.gregorian == calenderType) {

        } else {

        }



        /*

        Convert prayer to @Builder(toBuilder=true).
        Find out if Builder will cause any jackson message issues.

        validate if all 366 dates are available

        CREATE DATA

        Update all prayer years to 2016 // this is to keep all records and respect leap year

        sort prayers list by gregorian date

        use userGregorianYear. If userGregorianYear not passed by user, then
        find it from userHijriYear

        List<Prayer> prayers3Copies;

        loop 3 times
            loopYear = -1
            loop over prayers
                Create clonePrayer
                clonePrayerYear = userGregorianYear + loopYear;
                continue prayers loop if clonePrayer.date is 2/29 and clonePrayerYear is not leap year
                update clonePrayer.date with  clonePrayerYear
                Add clonePrayer to prayers3Copies
            loopYear++;



        SLICE prayers3Copies

        List<Prayer> prayerSlice;
        find limits by CalenderType, userYear and userMonth
        add prayers3Copies's prayer if prayers3Copies's prayer.date is within limits


        GROUP BY









        if gregorian
            update prayer with the year that is passed

        if hijri
            find gregorian equal year of 1/1/{year}
            update prayers year with the found year

        sort prayers list by gregorian date

        Make new list 3 copies of the prayers with updated year
            Run loop 3 times
            Do below with 2 times
                loop over prayers
                    clone each prayer and add it to a new list
                    update prayer year with year + 1

        Update the entire list's hijriString. hijriString should have year

        Create TreeMap<String, List<Prayer>>

        if month < 1 // create data for year
            if CalenderType.gregorian

            if CalenderType.hijri

        if month > 0 // create data for month
            if CalenderType.gregorian

            if CalenderType.hijri









        return map

         */

        return response.build();
    }
}
