import React from 'react';
import { createEmptyPrayerTimeSummaryMessage, PrayerTimeSummaryMessage } from "../types/react-types";
import { PrayerTimeSummary } from "mdb-core-js";
import { StyleSheet, Text } from 'react-native';
import { millisecondDurationToMinSecTime } from "mdb-core-js";

export const processPrayerTimeMessage = (prayerTimeSummary?: PrayerTimeSummary): PrayerTimeSummaryMessage => {
    const result = createEmptyPrayerTimeSummaryMessage();

    if (!prayerTimeSummary) {
        return result;
    }

    result.prayerTimeSummary = prayerTimeSummary;
    result.prayerName = createPrayerName(prayerTimeSummary);
    result.jamatStatus = createJamatStatus(prayerTimeSummary);
    result.nextPrayerStatus = createNextPrayerStatus(prayerTimeSummary);
    result.jamatStatusSet = isJamatStatusSet(prayerTimeSummary)
    return result;
}

const isJamatStatusSet = (prayerTimeSummary: PrayerTimeSummary): boolean => {
    if (!prayerTimeSummary) {
        return false;
    }

    // @ts-ignore
    return (prayerTimeSummary.prayerAboutToStartMillis && prayerTimeSummary.prayerAboutToStartMillis > 0) 
    || (prayerTimeSummary.prayerInProgressMillis && prayerTimeSummary.prayerInProgressMillis > 0);
}


const createJamatStatus = (prayerTimeSummary: PrayerTimeSummary): JSX.Element => {
    let result = <></>;

    if (prayerTimeSummary.prayerAboutToStartMillis && prayerTimeSummary.prayerAboutToStartMillis > 0) {
        result = (<>
            <Text style={styles.heading}>{prayerTimeSummary.currentPrayerName} jammat about to start in</Text>
            <Text style={styles.durationText}>{millisecondDurationToMinSecTime(prayerTimeSummary.prayerAboutToStartMillis)}</Text>
        </>);
    }

    if (prayerTimeSummary.prayerInProgressMillis && prayerTimeSummary.prayerInProgressMillis > 0) {
        result = (<>
            <Text style={styles.heading}>{prayerTimeSummary.currentPrayerName} jammat is in progress for</Text>
            <Text style={styles.durationText}>{millisecondDurationToMinSecTime(prayerTimeSummary.prayerInProgressMillis)}</Text>
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
            <Text style={styles.heading}>Next prayer {prayerTimeSummary.currentPrayerPeriod[1].name} in</Text>
            <Text style={styles.durationText}>{millisecondDurationToMinSecTime(prayerTimeSummary.nextPrayerInMillis)}</Text>
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



const styles = StyleSheet.create({
    heading: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "bold"
    },
    durationText: {
        color: "#fff",
        fontSize: 25,
    }
});