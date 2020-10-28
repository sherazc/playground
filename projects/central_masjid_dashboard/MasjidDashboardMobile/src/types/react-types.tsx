import { PrayerTimeSummary } from "./types";

export interface PrayerTimeSummaryMessage {
    prayerTimeSummary?: PrayerTimeSummary;
    prayerName: JSX.Element;
    jamatStatus: JSX.Element;
    nextPrayerStatus: JSX.Element;
}