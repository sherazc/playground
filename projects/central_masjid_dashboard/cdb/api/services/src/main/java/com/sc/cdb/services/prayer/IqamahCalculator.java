package com.sc.cdb.services.prayer;

import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class IqamahCalculator {

    public enum MinutesRound {
        roundTo15, roundTo30, noRound
    }

    public String calculate(
            Date date, String azanTime,
            int minimumDelayMinutes, int maximumDelayMinutes,
            MinutesRound roundTo) {

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
