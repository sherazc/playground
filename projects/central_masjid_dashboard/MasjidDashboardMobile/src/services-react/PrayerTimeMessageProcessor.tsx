import React from 'react';
import { createEmptyPrayerTimeSummaryMessage, PrayerTimeSummaryMessage } from "../types/react-types";
import { PrayerTimeSummary } from "../types/types";
import { Text } from 'react-native';
import { millisDurationToTimeString } from '../services/DateService';

export const processPrayerTimeMessage = (prayerTimeSummary?: PrayerTimeSummary): PrayerTimeSummaryMessage => {
    const result = createEmptyPrayerTimeSummaryMessage();

    if (!prayerTimeSummary || !prayerTimeSummary.currentPrayerName) {
        return result;
    }

    result.prayerTimeSummary = prayerTimeSummary;
    result.prayerName = createPrayerName(prayerTimeSummary);
    result.jamatStatus = createJamatStatus(prayerTimeSummary);
    result.nextPrayerStatus = createNextPrayerStatus(prayerTimeSummary);

    return result;
}

const createJamatStatus = (prayerTimeSummary: PrayerTimeSummary): JSX.Element => {
    let result = <></>;

    if (prayerTimeSummary.prayerAboutToStartMillis && prayerTimeSummary.prayerAboutToStartMillis > 0) {
        result = (<>
            <Text>{prayerTimeSummary.currentPrayerName} jammat about to start in</Text>
            <Text>{millisDurationToTimeString(prayerTimeSummary.prayerAboutToStartMillis)}</Text>
        </>);
    }

    if (prayerTimeSummary.prayerInProgressMillis && prayerTimeSummary.prayerInProgressMillis > 0) {
        result = (<>
            <Text>{prayerTimeSummary.currentPrayerName} jammat is in progress for</Text>
            <Text>{millisDurationToTimeString(prayerTimeSummary.prayerInProgressMillis)}</Text>
        </>);
    }
    return result;
}

const createNextPrayerStatus = (prayerTimeSummary: PrayerTimeSummary): JSX.Element => {
    let result = <></>;

    if (prayerTimeSummary.nextPrayerInMillis
        && prayerTimeSummary.nextPrayerInMillis > 0
        && prayerTimeSummary.currentPrayerPeriod && prayerTimeSummary.currentPrayerPeriod[1]
        && prayerTimeSummary.currentPrayerPeriod[1].name
    ) {
        result = (<>
            <Text>Next prayer {prayerTimeSummary.currentPrayerPeriod[1].name} in</Text>
            <Text>{millisDurationToTimeString(prayerTimeSummary.nextPrayerInMillis)}</Text>
        </>);
    }

    return result;
}


const createPrayerName = (prayerTimeSummary: PrayerTimeSummary): JSX.Element => {
    let result = <></>;
    if (prayerTimeSummary.currentPrayerName) {
        result = <Text>{prayerTimeSummary.currentPrayerName}</Text>;
    }
    return result;
}
