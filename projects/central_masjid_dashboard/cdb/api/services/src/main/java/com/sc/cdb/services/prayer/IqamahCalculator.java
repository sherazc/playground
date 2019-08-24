package com.sc.cdb.services.prayer;

import com.sc.cdb.services.common.DateTimeCalculator;
import org.springframework.stereotype.Service;

@Service
public class IqamahCalculator {

    private DateTimeCalculator dateTimeCalculator;

    public IqamahCalculator(DateTimeCalculator dateTimeCalculator) {
        this.dateTimeCalculator = dateTimeCalculator;
    }

    public enum MinutesRound {
        roundTo15, roundTo30, noRound
    }

    public String calculate(String azanTime, int minimumDelayMinutes, MinutesRound roundTo) {
        if (this.dateTimeCalculator.isValid24Time(azanTime)) {
            return null;
        }
        return "00:00";
    }
}



/*
    {
        "date": "2016-01-01T00:00:00.000+0000",
        "fajr": "06:15",
        "fajrIqama": null,
        "dhuhr": "12:38",
        "dhuhrIqama": null,
        "asr": "16:22",
        "asrIqama": null,
        "maghrib": "18:00",
        "maghribIqama": null,
        "isha": "19:18",
        "ishaIqama": null,
        "sunrise": "07:19"
    }

 */
