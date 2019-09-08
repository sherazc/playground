package com.sc.cdb.services.prayer;

import java.util.Calendar;

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
        if (!this.dateTimeCalculator.isValid24Time(azanTime)) {
            return null;
        }

        int[] azanTimeInt = dateTimeCalculator.hourMinuteStringToInt(azanTime);

        Calendar azanTimeCalendar = dateTimeCalculator
                .createCalendarFromTime(azanTimeInt[0], azanTimeInt[1]);

        azanTimeCalendar.add(Calendar.MINUTE, minimumDelayMinutes);

        int minutesAfterDelay = azanTimeCalendar.get(Calendar.MINUTE);

        int minutesToAddToRound = calculateMinutesToAddAfterRound(minutesAfterDelay, roundTo);

        azanTimeCalendar.add(Calendar.MINUTE, minutesToAddToRound);

        return dateTimeCalculator.hourMinuteIntToString(new int[]{
                azanTimeCalendar.get(Calendar.HOUR_OF_DAY),
                azanTimeCalendar.get(Calendar.MINUTE)});
    }

    private int calculateMinutesToAddAfterRound(int minutesAfterDelay, MinutesRound roundTo) {
        int minutesToAddAfterRound = 0;
        if (roundTo == null) {
            roundTo = MinutesRound.noRound;
        }

        if (roundTo == MinutesRound.roundTo15) {
            if (minutesAfterDelay > 0 && minutesAfterDelay < 15) {
                minutesToAddAfterRound = 15 - minutesAfterDelay;
            } else if (minutesAfterDelay > 15 && minutesAfterDelay < 30) {
                minutesToAddAfterRound = 30 - minutesAfterDelay;
            } else if (minutesAfterDelay > 30 && minutesAfterDelay < 45) {
                minutesToAddAfterRound = 45 - minutesAfterDelay;
            } else if (minutesAfterDelay > 45 && minutesAfterDelay < 60) {
                minutesToAddAfterRound = 60 - minutesAfterDelay;
            }
        } else if (roundTo == MinutesRound.roundTo30) {
            if (minutesAfterDelay > 0 && minutesAfterDelay < 30) {
                minutesToAddAfterRound = 30 - minutesAfterDelay;
            } else if (minutesAfterDelay > 30 && minutesAfterDelay < 60) {
                minutesToAddAfterRound = 60 - minutesAfterDelay;
            }
        }

        return minutesToAddAfterRound;
    }
}
